const crypto = require('crypto');
const fs = require('fs');
const Path = require('path');
const Utils = require('./latexUtils.js');

const rootDirectory = Path.resolve(__dirname, "Archive")
module.exports = async function tabulate() {


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
            const texDocument = Utils.getExtension(contents, ".tex")[0];
            if (!texDocument) {
                throw new Error(`${category}/${entry}: Missing tex document`);
            }

            const pdfDocument = Utils.getExtension(contents, ".pdf")[0];
            if (!pdfDocument) {
                throw new Error(`${category}/${entry}: Missing pdf document`);
            }

            const texDocumentContents = fs.readFileSync(Path.join(entryPath, texDocument), "utf-8").replaceAll(/(?<!\\)\%.*/g, "");
            const titleString = Utils.getMacro(texDocumentContents, "title").split(":").map((a) => a.trim());
            const identifier = titleString[0];
            const title = titleString.splice(1).join(":").trim();
            const authorlist = Utils.getMacro(texDocumentContents, "author").split(",");
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
            const tags = Utils.getMacro(texDocumentContents, "tags").split(",").map((a) => a.trim());
            const date = Utils.getMacro(texDocumentContents, "date").trim();
            const revision = Utils.getMacro(texDocumentContents, "revision").trim().replace("Revision ", "");
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

            if (!fs.existsSync(Path.join(entryPath, image))) {
                throw new Error(`${category}/${entry}: Missing image file`);
            }

            const entryJson = {
                path: [category, entry],
                identifier: Utils.latexDeescape(identifier),
                title: Utils.latexDeescape(title),
                authors: authors.map((a) => Utils.latexDeescape(a)),
                tags: tags.map((a) => Utils.latexDeescape(a)),
                date: Utils.latexDeescape(date),
                revision: Utils.latexDeescape(revision),
                description: Utils.latexDeescape(description),
                image: Utils.latexDeescape(image),
                tex: texDocument,
                pdf: pdfDocument
            }

            if (!featureList) {
                console.warn(`${category}/${entry}: Missing feature list`);
            } else {
                const features = Utils.getMacros(featureList, "item");
                if (features.length === 0) {
                    console.warn(`${category}/${entry}: Missing features`);
                }
                entryJson.features = features.map((a) => Utils.latexDeescape(a));
            }

            if (!applicationList) {
                console.warn(`${category}/${entry}: Missing application list`);
            } else {
                const applications = Utils.getMacros(applicationList, "item");
                if (applications.length === 0) {
                    console.warn(`${category}/${entry}: Missing applications`);
                }
                entryJson.applications = applications.map((a) => Utils.latexDeescape(a));
            }

            let Specifications = Utils.extractLatexTable(texDocumentContents, "Device Specifications");

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

            let DownloadInfo = Utils.extractLatexTable(texDocumentContents, "Download Information");
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
                    file: Utils.latexGetTextOrLinkText(row[2]),
                    link: Utils.latexGetHref(row[2])?.url,
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

            let RelatedComponents = Utils.extractLatexTable(texDocumentContents, "Related Components");

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

            let TestData = Utils.extractLatexTable(texDocumentContents, "Executed Tests");

            if (TestData) {
                if (TestData.header.join(",") !== "Test,Result") {
                    throw new Error(`${category}/${entry}: Invalid test data table`);
                }

                entryJson.testData = TestData.rows.map((row) => {
                    return {
                        test: row[0],
                        result: row[1]
                    }
                });
            } else {
                console.warn(`${category}/${entry}: Missing test data table`);
            }

            entriesResults.push(entryJson);
        })
    })

    entriesResults.forEach((entry) => {
        if (entry.relatedComponents) {
            entry.relatedComponents.forEach((related) => {
                let found = entriesResults.find((a) => {
                    return a.identifier === related.identifier;
                })

                if (!found) {
                    throw new Error(`${entry.category}/${entry.identifier}: Missing related component ${related.identifier}`);
                }
            })
        }
    });

    fs.writeFileSync(Path.join(__dirname, "data.json"), JSON.stringify({
        version: 1,
        categories,
        entries: entriesResults
    }, null, 4));
}

