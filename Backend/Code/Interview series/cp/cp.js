const cp = require("child_process");

// cp.exec("start chrome https://www.youtube.com/watch?v=xEBqjUNx34Y&list=PL-Jc9J83PIiHxc8vuYMq3C1KUvqc_jB6L&index=7&ab_channel=Pepcoding")



let output = cp.execSync("node test.js")
console.log("Output"+output);