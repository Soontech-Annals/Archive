const crypto = require('crypto');
const fs = require('fs');
const fsp = require('fs/promises');
const Path = require('path');

const BASE_URL = "https://github.com/Soontech-Annals/Archive";

const Utils = require('./latexUtils.js');
const rootDirectory = Path.resolve(__dirname, "Archive")
const exec = require('child_process').exec;

function buildLatex(path) {
    return new Promise((resolve, reject) => {
        exec(`latexmk -pdf -cd -interaction=nonstopmode -f`, {
            cwd: path
        }, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve([stdout, stderr]);
            }
        })
    });
}
module.exports = async function preprocess() {
    const commitID = await (new Promise((resolve, reject) => {
        exec('git rev-parse HEAD', {
            cwd: __dirname
        }, function (err, stdout) {
            if (err) {
                reject(err);
            } else {
                resolve(stdout.trim());
            }
        });
    }));

    console.log(`Using commit ${commitID} as base for the archive.`)

    const entriesList = [];
    const categories = fs.readdirSync(rootDirectory).filter((name) => {
        return fs.lstatSync(Path.join(rootDirectory, name)).isDirectory()
    })
    categories.forEach((category) => {
        const categoryPath = Path.join(rootDirectory, category);
        const entries = fs.readdirSync(categoryPath).filter((name) => {
            return fs.lstatSync(Path.join(categoryPath, name)).isDirectory();
        });

        entries.forEach((entry) => {

            const entryPath = Path.join(categoryPath, entry);
            const contents = fs.readdirSync(entryPath);
            let texDocument = Utils.getExtension(contents, ".tex")[0];


            if (!texDocument) {
                console.log(`${category}/${entry}: Missing tex document. I will create one for you.`);
                let exampleDatasheet = fs.readFileSync(Path.join(__dirname, "exampleDatasheet.tex"), "utf8");

                const split = entry.split(" ");
                const identifier = split[0];
                const idtitle = split.splice(1).join(" ");
                let schematicFile = Utils.getExtension(contents, ".litematic")[0] || Utils.getExtension(contents, ".schematic")[0] || Utils.getExtension(contents, ".zip")[0];
                const imageFile = Utils.getExtension(contents, ".png")[0];


                const date = new Date();
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const datestr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

                if (!schematicFile) {
                    throw new Error(`${category}/${entry}: Missing schematic file`);
                }

                if (schematicFile.substring(0, identifier.length) !== identifier) {
                    console.log("Moving download file to correct name")
                    const file = fs.readFileSync(Path.join(entryPath, schematicFile));
                    let original = schematicFile;
                    schematicFile = `${identifier}_${idtitle.replaceAll(" ", "_")}` + schematicFile.substring(schematicFile.lastIndexOf("."));
                    fs.writeFileSync(Path.join(entryPath, schematicFile), file);
                    fs.unlinkSync(Path.join(entryPath, original));

                }

                if (!imageFile) {
                    throw new Error(`${category}/${entry}: Missing image file`);
                }

                exampleDatasheet = exampleDatasheet.replaceAll("_Identifier", identifier);
                exampleDatasheet = exampleDatasheet.replaceAll("_Title", idtitle);
                exampleDatasheet = exampleDatasheet.replaceAll("_SchematicFile", schematicFile.replaceAll("_", "\\_"));
                exampleDatasheet = exampleDatasheet.replaceAll("_ImageCaption", idtitle);
                exampleDatasheet = exampleDatasheet.replaceAll("_Image", imageFile);
                exampleDatasheet = exampleDatasheet.replaceAll("_Date", datestr);
                exampleDatasheet = exampleDatasheet.replaceAll("_CategoryTag", category);


                fs.writeFileSync(Path.join(entryPath, `${entry.replaceAll(" ", "_")}.tex`), exampleDatasheet);
                texDocument = `${entry.replaceAll(" ", "_")}.tex`;
            }


            entriesList.push({
                category,
                entry,
                path: entryPath,
                texDocument,
                contents
            });
        });
    });



    await Promise.all(entriesList.map(async (entry) => {
        let texDocumentContents = await fsp.readFile(Path.join(entry.path, entry.texDocument), "utf8");
        const category = entry.category;
        const entryName = entry.entry;
        let DownloadInfo = Utils.extractLatexTable(texDocumentContents, "Download Information");
        if (!DownloadInfo) {
            throw new Error(`${category}/${entryName}: Missing download information table`);
        }

        if (DownloadInfo.header.join(",") !== "Identifier,MC,File,Description") {
            throw new Error(`${category}/${entryName}: Invalid download information table`);
        }

        const downloadInfo = DownloadInfo.rows.map((row,i) => {
            return {
                file: Utils.latexGetTextOrLinkText(row[2]),
                indexOfFile: DownloadInfo.indexes[i + 1][2]
            }
        });
        
        await Promise.all(downloadInfo.map(async (item) => {
            const path = Path.join(entry.path, item.file);
            try {
                const hasher = crypto.createHash('sha256');
                hasher.update(await fs.readFileSync(path));

                item.sha256 = hasher.digest('hex');
            } catch (e) {
                throw new Error(`${category}/${entryName}: Missing download file ${item.file}`);
            }
        }))

        const buildCache = Path.join(entry.path, "buildCache.json");

        let texHash = crypto.createHash('sha256').update(texDocumentContents).digest('hex');
        try {
            throw new Error("No build cache found");
            const cache = JSON.parse(await fsp.readFile(buildCache, "utf8"));
            
            if (cache.texHash === texHash) {
                if (downloadInfo.every((item) => {
                    return cache?.downloadHashes?.[item.file] === item.sha256;
                })) {
                    return;
                }
            }
        } catch (e) {
            console.log(`${entry.category}/${entryName}: No build cache found`);
        }

        for (let i = downloadInfo.length - 1; i >= 0; i--) {
            const item = downloadInfo[i];
            let url = encodeURI(`${BASE_URL}/blob/${commitID}/Archive/${category}/${entryName}/${item.file}?raw=1`);
            let href = Utils.latexMakeHref(Utils.latexEscape(url), Utils.latexEscape(item.file));
            texDocumentContents = Utils.spliceString(texDocumentContents, item.indexOfFile[0], item.indexOfFile[1], href);
        }

        await fsp.writeFile(Path.join(entry.path, entry.texDocument), texDocumentContents);
        texHash = crypto.createHash('sha256').update(texDocumentContents).digest('hex');;
        console.log(`${entry.category}/${entryName}: Building latex document`);
        const result = await buildLatex(entry.path);

        await fsp.writeFile(buildCache, JSON.stringify({
            texHash,
            downloadHashes: downloadInfo.reduce((acc, item) => {
                acc[item.file] = item.sha256;
                return acc;
            }, {})
        }, null, 4));
    }));
}

