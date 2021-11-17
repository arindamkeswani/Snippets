const cp= require('child_process');

// cp.exec("start chrome")

// cp.exec("start chrome https://www.youtube.com/watch?v=JjOvDXe8-jQ&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=55&ab_channel=Pepcoding")

const output = cp.execSync("node test.js")

console.log("Output: "+output);