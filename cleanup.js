const fs = require('fs')
const Glob = require('./glob.js')

const files = Glob([
    __dirname + '/Archive/*/*/*.aux',
    __dirname + '/Archive/*/*/*.fdb_latexmk',
    __dirname + '/Archive/*/*/*.fls',
    __dirname + '/Archive/*/*/*.log',
    __dirname + '/Archive/*/*/*.out',
    __dirname + '/Archive/*/*/*.synctex.gz'
])
files.forEach((file)=>{
    fs.unlink(file,()=>{
        
    })
})
