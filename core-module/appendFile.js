const fs = require('node:fs');

fs.appendFile('./dir/content.txt', '\n Hello, World!', (err) => {
    if (err) throw err;
});
console.log('File written');
