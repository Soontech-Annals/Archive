const fs = require('fs');
const Path = require('path');
const data = JSON.parse(fs.readFileSync(Path.join(__dirname, "data.json"), "utf8"));
const entries = data.entries;

data.categories.forEach((category) => {

    const entriesInCategory = getEntriesInCategory(category);


    let readme = `# ${category}\n${entriesInCategory.length} Result(s)\n\n`;

    readme += entriesInCategory.map((entry) => {
        const version = entry.specifications["MC Version"];
        const minVersion = version.min || "-";
        const typVersion = version.typ || "-";
        const maxVersion = version.max || "-";

        const versionString = `[${minVersion}; ${typVersion}; ${maxVersion}]`;
        const authors = entry.authors.map((author, i) => {
            if (i !== 0 && i === entry.authors.length - 1) {
                return "& " + author;
            }
            return author;
        }).join(", ");
        const identifier = entry.identifier;
        const title = entry.title;

        const features = entry.features.map((feature) => {
            return "- " + feature;
        }).join("\n");

        const image = `<img src="${encodeURI(entry.path[1] + "/" + entry.image)}?raw=1" height="300px">`

        /*
        "downloadInfo": [
                {
                    "identifier": "BV01",
                    "mc": "1.17.1",
                    "file": "BV01_hopperspeed_grouper_p1.litematic",
                    "description": "Litematic of grouper device",
                    "sha256": "286c51558f89ea7fd86f764922eef816fa99ac889e1d93c38940c12bf0e51630"
                }
            ]
        */
        let whitespaces = [0, 0, 0, 0, 0];
        let header = ["Identifier", "MC", "File", "Description", "SHA256"];
        header.forEach((item, i) => {
            whitespaces[i] = Math.max(item.length, whitespaces[i]);
        });

   
        entry.downloadInfo.forEach((download, i) => {
            download.file = `[${download.file}](${encodeURI(entry.path[1] + "/" + download.file) + "?raw=1"})`
            download.sha256 = "`" + download.sha256 + "`";
            whitespaces[0] = Math.max(download.identifier.length, whitespaces[0]);
            whitespaces[1] = Math.max(download.mc.length, whitespaces[1]);
            whitespaces[2] = Math.max(download.file.length, whitespaces[2]);
            whitespaces[3] = Math.max(download.description.length, whitespaces[3]);
            whitespaces[4] = Math.max(download.sha256.length, whitespaces[4]);
        });

        whitespaces.forEach((item, i) => {
            whitespaces[i] += 2;
        });

        const headerString = "|" + header.map((item, i) => {
            return item.padEnd(whitespaces[i]);
        }).join(" | ") + "|";

        const divider = "|" + whitespaces.map((item) => {
            return "-".repeat(item);
        }).join(" |:") + "|";
            
        const downloadInfoTable = entry.downloadInfo.map((download, i) => {
            return "|" + [download.identifier, download.mc, download.file, download.description, download.sha256].map((item, i) => {
                return item.padEnd(whitespaces[i]);
            }).join(" | ") + "|";
        }).join("\n");

        const downloadInfo = `
#### Download Info:
${headerString}
${divider}
${downloadInfoTable}
`;
        return `# ${versionString} [${identifier}](${encodeURI(entry.path[1])}): [${title}](${encodeURI(entry.path[1] + "/" + entry.pdf)})\n### *By ${authors}*\n\n${entry.description}\n\n${image}\n\n#### Features:\n${features}\n${downloadInfo}`
    }).join("\n\n\n");

    fs.writeFileSync(Path.join(__dirname, "Archive", category, "README.md"), readme, "utf8");
});

function getEntriesInCategory(category) {
    return entries.filter((entry) => {
        return entry.path[0] === category;
    });
}
