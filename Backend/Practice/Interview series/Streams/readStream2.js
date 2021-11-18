const fs = require('fs');

let content = 'Hello how are you 2';
readStream = fs.createReadStream('input.txt')
writeStream = fs.createWriteStream('output2.txt');
readStream.pipe(writeStream)
let arr =[];

// writeStream.write(content)
// writeStream.end();
// readStream.on('data', function(chunk){
//     content += chunk
//     arr.push(chunk+"");
//     // console.log(chunk);
//     console.log("----------------------------------------------------------------------------------------")

// })

// readStream.on('end', function(){
//     console.log(arr.length)
//     console.log("----------------------------------------------------------------------------------------")
//     // console.log(content);
// })



