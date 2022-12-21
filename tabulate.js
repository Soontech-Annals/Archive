const crypto = require('crypto');
const fs = require('fs');
const Path = require('path');

const rootDirectory = Path.resolve(__dirname, "Archive")

const categories = fs.readdirSync(rootDirectory).filter((name) => {
    return fs.lstatSync(Path.join(rootDirectory, name)).isDirectory()
})
const entriesResults = [];
categories.forEach((category) => {
    const categoryPath = Path.join(rootDirectory, category);
    const entries = fs.readdirSync(categoryPath).filter((name) => {
        return fs.lstatSync(Path.join(categoryPath, name)).isDirectory();
    });

    entries.forEach((entry) => {
        const entryPath = Path.join(categoryPath, entry);
        const contents = fs.readdirSync(entryPath);
        const texDocument = getExtension(contents, ".tex")[0];
        if (!texDocument) {
            throw new Error(`${category}/${entry}: Missing tex document`);
        }

        const pdfDocument = getExtension(contents, ".pdf")[0];
        if (!texDocument) {
            throw new Error(`${category}/${entry}: Missing pdf document`);
        }

        /*
            \title{BV01: Simple Hopperspeed Grouper}
            \author{Andrews54757}
            \tags{box-variable, hopperspeed}
            \date{October 2022}
            \revision{Revision 1}
        */
        const texDocumentContents = fs.readFileSync(Path.join(entryPath, texDocument), "utf-8").replaceAll(/(?<!\\)\%.*/g, "");

        const titleString = getMacro(texDocumentContents, "title").split(":").map((a) => a.trim());
        const identifier = titleString[0];
        const title = titleString.splice(1).join(":").trim();
        const authorlist = getMacro(texDocumentContents, "author").split(",");
        const authors = authorlist.map((a, i) => {
            a = a.trim()
            if (authorlist.length > 1 && i === authorlist.length - 1) {
                if (a.substring(0, 3).toLowerCase() === "and") {
                    a = a.substring(3).trim();
                } else if (a.charAt(0) === "&") {
                    a = a.substring(1).trim();
                }
            }
            return a;
        });
        const tags = getMacro(texDocumentContents, "tags").split(",").map((a) => a.trim());
        const date = getMacro(texDocumentContents, "date").trim();
        const revision = getMacro(texDocumentContents, "revision").trim().replace("Revision ", "");
        const description = texDocumentContents.match(/\\section{General Description}([\W\w]*?)\\vfill\\break/m)?.[1]?.trim();
        const featureList = texDocumentContents.match(/\\section{Features}\W*\\begin{itemize}([\W\w]*?)\\end{itemize}/im)?.[1]?.trim();
        const image = texDocumentContents.match(/\\includegraphics\[.*?\]{(.*?)}/)?.[1]?.trim();
        const applicationList = texDocumentContents.match(/\\section{Applications}\W*\\begin{itemize}([\W\w]*?)\\end{itemize}/im)?.[1]?.trim();

        if (!identifier) {
            throw new Error(`${category}/${entry}: Missing identifier`);
        }

        if (!title) {
            throw new Error(`${category}/${entry}: Missing title`);
        }

        if (!authors) {
            throw new Error(`${category}/${entry}: Missing authors`);
        }

        if (!tags) {
            throw new Error(`${category}/${entry}: Missing tags`);
        }

        if (!date) {
            throw new Error(`${category}/${entry}: Missing date`);
        }

        if (!revision) {
            throw new Error(`${category}/${entry}: Missing revision`);
        }

        if (!description) {
            console.warn(`${category}/${entry}: Missing description`);
        }

        if (!image) {
            throw new Error(`${category}/${entry}: Missing image`);
        }

        const entryJson = {
            path: [category, entry],
            identifier: latexDeescape(identifier),
            title: latexDeescape(title),
            authors: authors.map((a) => latexDeescape(a)),
            tags: tags.map((a) => latexDeescape(a)),
            date: latexDeescape(date),
            revision: latexDeescape(revision),
            description: latexDeescape(description),
            image: latexDeescape(image),
            tex: texDocument,
            pdf: pdfDocument
        }

        if (!featureList) {
            console.warn(`${category}/${entry}: Missing feature list`);
        } else {
            const features = getMacros(featureList, "item");
            if (features.length === 0) {
                console.warn(`${category}/${entry}: Missing features`);
            }
            entryJson.features = features.map((a) => latexDeescape(a));
        }

        if (!applicationList) {
            console.warn(`${category}/${entry}: Missing application list`);
        } else {
            const applications = getMacros(applicationList, "item");
            if (applications.length === 0) {
                console.warn(`${category}/${entry}: Missing applications`);
            }
            entryJson.applications = applications.map((a) => latexDeescape(a));
        }

        let Specifications = extractLatexTable(texDocumentContents, "Device Specifications");

        if (!Specifications) {
            throw new Error(`${category}/${entry}: Missing specifications table`);
        }

        if (Specifications.header.join(",") !== "Parameter,Min.,Typ.,Max.,Unit,Conditions") {
            throw new Error(`${category}/${entry}: Invalid specifications table`);
        }

        let SpecsDict = {};
        Specifications.rows.forEach((row) => {

            let parameter = row[0];
            let min = row[1] === "-" ? "" : row[1];
            let typ = row[2] === "-" ? "" : row[2];
            let max = row[3] === "-" ? "" : row[3];
            let unit = row[4];
            let conditions = row[5];

            SpecsDict[parameter] = {
                unit: unit,
                conditions: conditions
            }

            if (min) {
                SpecsDict[parameter].min = min;
            }

            if (typ) {
                SpecsDict[parameter].typ = typ;
            }

            if (max) {
                SpecsDict[parameter].max = max;
            }
        });



        if (!SpecsDict["MC Version"]) {
            throw new Error(`${category}/${entry}: Missing MC Version specification`);
        }

        if (!SpecsDict["Dimensions"]) {
            console.warn(`${category}/${entry}: Missing Dimensions specification`);
        }

        entryJson.specifications = SpecsDict;

        let DownloadInfo = extractLatexTable(texDocumentContents, "Download Information");
        if (!DownloadInfo) {
            throw new Error(`${category}/${entry}: Missing download information table`);
        }

        if (DownloadInfo.header.join(",") !== "Identifier,MC,File,Description") {
            throw new Error(`${category}/${entry}: Invalid download information table`);
        }

        entryJson.downloadInfo = DownloadInfo.rows.map((row) => {
            return {
                identifier: row[0],
                mc: row[1],
                file: row[2],
                description: row[3]
            }
        });

        entryJson.downloadInfo.forEach((item) => {
            const path = Path.join(entryPath, item.file);
            if (!fs.existsSync(path)) {
                throw new Error(`${category}/${entry}: Missing download file ${item.file}`);
            }

            const hasher = crypto.createHash('sha256');
            hasher.update(fs.readFileSync(path));

            item.sha256 = hasher.digest('hex');
        })

        let RelatedComponents = extractLatexTable(texDocumentContents, "Related Components");

        if (RelatedComponents) {
            if (RelatedComponents.header.join(",") !== "Identifier,Description") {
                throw new Error(`${category}/${entry}: Invalid related components table`);
            }

            entryJson.relatedComponents = RelatedComponents.rows.map((row) => {
                return {
                    identifier: row[0],
                    description: row[1]
                }
            });
        }

        entriesResults.push(entryJson);
    })
})

function extractLatexTable(tex, caption) {
    let matches = tex.match(new RegExp(`\\\\caption{${caption}}\\W*\\\\begin{tabularx}{\\\\textwidth}{(.*?)}([\\W\\w]*?)\\\\end{tabularx}`, "im"));
    if (!matches) {
        return null;
    }
    let columns = matches[1].split("").filter((a) => {
        return a !== " " && a !== "|";
    });

    let rows = matches[2].replaceAll("\\thickhline", "").replaceAll("\\hline", "").split("\\\\").filter((a) => {
        return a.trim() !== ""
    });
    let table = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].trim();

        let cells = row.split(/(?<!\\)\&/);
        let tableRow = cells.map((a) => {
            return a.trim();
        });
        table.push(tableRow);
    }

    let obj = {
        columns,
        header: table[0],
        rows: table.slice(1)
    }

    obj.header = obj.header.map((a) => {
        return a.replaceAll(/\\textbf\{(.*?)\}/g, "$1");
    });

    for (let i = 0; i < obj.rows.length; i++) {
        for (let j = 0; j < obj.rows[i].length; j++) {
            let cell = obj.rows[i][j];

            let multirow = cell.match(/\\multirow\{(.*?)\}\{(.*?)\}\{(.*?)\}/);
            if (multirow) {
                let rowspan = parseInt(multirow[1]);
                let content = multirow[3];

                for (let k = 0; k < rowspan; k++) {
                    obj.rows[i + k][j] = content;
                }
            }
        }
    }

    for (let i = 0; i < obj.rows.length; i++) {
        for (let j = 0; j < obj.rows[i].length; j++) {
            obj.rows[i][j] = latexDeescape(obj.rows[i][j].replaceAll("\\", ""));
        }
    }
    return obj;
}

function getMacro(tex, name, searchStart) {
    searchStart = searchStart || 0;
    let startIndex = tex.indexOf(`\\${name}{`, searchStart);
    if (startIndex === -1) {
        return "";
    }
    startIndex += 2 + name.length;

    let braces = 1;
    let i = startIndex;
    for (; i < tex.length; i++) {
        if (tex[i] === "\\") {
            i++;
        } else
            if (tex[i] === "{") {
                braces++;
            } else if (tex[i] === "}") {
                braces--;
                if (braces < 0) {
                    throw new Error("Mismatched braces");
                } else
                    if (braces === 0) {
                        break;
                    }
            }
    }
    if (braces !== 0) {
        throw new Error("Mismatched braces");
    }
    return tex.substring(startIndex, i)
}

function getMacros(tex, name, searchStart) {
    let currentPosition = searchStart || 0;
    let macros = [];
    while (true) {
        let macro = getMacro(tex, name, currentPosition);
        if (!macro) {
            break;
        }
        macros.push(macro);
        currentPosition += macro.length + 3 + name.length;
    }
    return macros;
}

function getExtension(list, extension) {
    return list.filter((item) => {
        return item.substring(item.length - extension.length) === extension;
    })
}

function latexDeescape(string) {
    return string.replaceAll("\\&", "&").replaceAll("\\%", "%").replaceAll("\\$", "$").replaceAll("\\#", "#").replaceAll("\\_", "_").replaceAll("\\{", "{").replaceAll("\\}", "}").replaceAll("\\~", "~").replaceAll("\\^", "^").replaceAll("\\\\", "\\");
}


fs.writeFileSync(Path.join(__dirname, "data.json"), JSON.stringify({
    version: 1,
    categories,
    entries: entriesResults
}, null, 4));
