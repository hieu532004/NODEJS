const fs = require('node:fs');
//Ghi file content.txt
fs.writeFile('./dir/content.txt', 'Hello, World!', (err) => {
    if (err) throw err;
    console.log('File written');
});