const fs = require('fs/promises')
const Glob = require('./glob.js')

module.exports = async function cleanup() {
    const files = Glob([
        __dirname + '/Archive/*/*/*.aux',
        __dirname + '/Archive/*/*/*.fdb_latexmk',
        __dirname + '/Archive/*/*/*.fls',
        __dirname + '/Archive/*/*/*.log',
        __dirname + '/Archive/*/*/*.out',
        __dirname + '/Archive/*/*/*.synctex.gz'
    ])

    await Promise.all(files.map((file)=>{
        return fs.unlink(file);
    }));
    
    return files;
}