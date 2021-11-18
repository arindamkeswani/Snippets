//setImmediate 
//process.nextTick
//setTimeout

function add(a,b){
    console.log(a+b);
}

//check handler/queue
setImmediate(()=>{
    add(3,4); //callback
    console.log("SetImmediate");
    console.log("_____");
})
    
//timer queue
setTimeout(()=>{
    add(5,4); //callback
    console.log("setTimeout");
    console.log("_____");
})

process.nextTick(()=>{
    add(5,7); //callback
    console.log("process.nextTick");
    console.log("_____");
})

console.log("process finished");
