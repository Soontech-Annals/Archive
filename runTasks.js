const cleanup = require('./cleanup.js')
const tabulate = require('./tabulate.js')
const generateReadmes = require('./generateReadmes.js');
const preprocess = require('./preprocess.js');

(async () => {

    await preprocess();
    
    const files = await cleanup();
    console.log(`Cleaned up ${files.length} files.`);

    await tabulate();
    console.log("Generated data.json");

    generateReadmes();
    console.log("Generated readmes")
})();