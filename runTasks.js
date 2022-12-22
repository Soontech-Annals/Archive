const cleanup = require('./cleanup.js')
const tabulate = require('./tabulate.js')
const generateReadmes = require('./generateReadmes.js');

(async () => {
    const files = await cleanup();
    console.log(`Cleaned up ${files.length} files.`);

    tabulate();
    console.log("Generated data.json");

    generateReadmes();
    console.log("Generated readmes")
})();