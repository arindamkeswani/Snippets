const fs = require('fs');

let readStream = fs.createReadStream('input2.txt');

let writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);