//Import file system module
const fs = require('fs');

//data will be streamed in this "content" in chunks
let content ='';

//the file the we will be inputing data from
let readStream  = fs.createReadStream('inpu.txt')

//we pass an event "data"
//Whatever we pass, is read in chunks
readStream.on('data', function(chunk){
    content += chunk
})

//print data as soon as it comes coming
readStream.on('end', function(){
    console.log(content);
})

readStream.on("error", function(err){
    console.log(err.stack);
})