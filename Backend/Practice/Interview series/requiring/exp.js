//////////////////  1
// console.log("Exp file");

////////////////  2
// module.exports =10;

///////////////// 4
// module.exports = {
//     a: 10,
//     b: 20
// }

//////////////// 5
// module.exports = {
//     fun : function(){
//         console.log("This is the function that you imported")
//     }
// }

// module.exports = function(){
//     console.log("This is the function that you imported")
// }
///////// 7

// require("./index")
// console.log("Exp");

//////// 8 
// module.exports = {
//     data: 10
// }

let fs = require('fs');
fs.readFile('./index.js',(err,data)=>{
    module.exports.data
})