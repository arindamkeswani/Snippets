const fs = require('fs');

let content = '';
let readStream = fs.createReadStream('input.txt');

let arr=[]
readStream.on('data', function(chunk){
    arr.push(chunk);
    // content+=chunk;
})

readStream.on('end', function(){
    // console.log(content);
    console.log(arr.length);
})

readStream.on('error', function(err){
    console.log(err.stack);
})