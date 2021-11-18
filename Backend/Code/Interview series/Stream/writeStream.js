const fs = require('fs');

let content = 'I solve questions on backend on pepcoding';

let writeStream = fs.createWriteStream('output.txt');

writeStream.write(content, 'utf-8');

writeStream.end();

writeStream.on('finish', function(){
    console.log("Finished writing");
})

