
module.exports = {
    extractLatexTable: function (tex, caption) {
        let matches = tex.match(new RegExp(`([\\W\\w]*\\\\caption{${caption}}\\W*\\\\begin{tabularx}{\\\\textwidth}){(.*?)}([\\W\\w]*?)\\\\end{tabularx}`, "im"));
        if (!matches) {
            return null;
        }

        let index = matches[1].length + 1;
        let columns = matches[2].split("").filter((a) => {
            return a !== " " && a !== "|";
        });

        index += matches[2].length + 1;
       
        let split = matches[3].split("\\\\");

        let indexes = [];
        let table = [];
        for (let i = 0; i < split.length; i++) {
            let row = split[i].replaceAll("\\hline", "").replaceAll("\\thickhline","").trim();
            if (row.length !== 0) {
                let rowIndex = index + split[i].indexOf(row);
                let cells = [];
                let cellsIndexes = [];
                let rowSplit = row.split(/(?<!\\)\&/);
                for (let j = 0; j < rowSplit.length; j++) {
                    let cell = rowSplit[j].trim();
                    let index = rowIndex;
                    if (cell.length !== 0) {
                        index += rowSplit[j].indexOf(cell);
                    }

                    cells.push(cell);
                    cellsIndexes.push([index, cell.length]);
                    rowIndex += rowSplit[j].length + 1;
                }
                table.push(cells);
                indexes.push(cellsIndexes);
            }
            index += split[i].length + 2;
        }
        
        let obj = {
            columns,
            header: table[0],
            rows: table.slice(1),
            indexes: indexes
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
                obj.rows[i][j] = this.latexDeescape(obj.rows[i][j]);
            }
        }
        return obj;
    },

    getMacro: function (tex, name, searchStart) {
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
    },

    getMacros: function (tex, name, searchStart) {
        let currentPosition = searchStart || 0;
        let macros = [];
        while (true) {
            let macro = this.getMacro(tex, name, currentPosition);
            if (!macro) {
                break;
            }
            macros.push(macro);
            currentPosition += macro.length + 3 + name.length;
        }
        return macros;
    },

    getExtension: function (list, extension) {
        return list.filter((item) => {
            return item.substring(item.length - extension.length) === extension;
        })
    },

    latexDeescape: function (string) {
        return string.replaceAll("\\&", "&").replaceAll("\\%", "%").replaceAll("\\$", "$").replaceAll("\\#", "#").replaceAll("\\_", "_").replaceAll("\\{", "{").replaceAll("\\}", "}").replaceAll("\\~", "~").replaceAll("\\^", "^").replaceAll("\\\\", "\\");
    },

    latexEscape: function(string) {
        return string.replaceAll("\\", "\\\\").replaceAll("&", "\\&").replaceAll("%", "\\%").replaceAll("$", "\\$").replaceAll("#", "\\#").replaceAll("_", "\\_").replaceAll("{", "\\{").replaceAll("}", "\\}").replaceAll("~", "\\~").replaceAll("^", "\\^");
    },
    latexHrefToMarkdown: function (string) {
        return string.replace(/\\href\{(.*)\}\{(.*)\}/g, "[$2]($1)");
    },

    latexGetHref: function (string) {
        let match = string.match(/\\href\{(.*)\}\{(.*)\}/);
        if (match) {
            return {
                url: match[1],
                text: match[2]
            }
        } else {
            return null;
        }
    },

    latexMakeHref: function (url, text) {
        return `\\href{${url}}{${text}}`;
    },

    latexGetTextOrLinkText: function (string) {
        return this.latexGetHref(string)?.text || string;
    },

    spliceString: function (string, index, count, add) {
        return string.substring(0, index) + (add || "") + string.substring(index + count);
    }
}