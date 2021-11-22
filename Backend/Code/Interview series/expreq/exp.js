const fs = require('fs')
fs.readFile('./index.js', (err,data)=>{
    module.exports.data = 10
})