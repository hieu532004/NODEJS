const fs = require('node:fs');
//Đọc file text.txt
fs.readFile('./dir/content.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});