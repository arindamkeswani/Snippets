function add(a,b){
    console.log(a+b);
}

// add(2,3)

setImmediate(()=>{
    add(2,3) //callback registered 
    console.log("This is set immediate");
})

setTimeout(()=>{
    add(3,4)
    console.log("This is set timeout");
})


process.nextTick(()=>{
    add(4,4)
    console.log("This is PROCESS.nexttick");
})

console.log("Process has ended");

