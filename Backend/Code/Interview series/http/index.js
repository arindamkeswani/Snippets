let http = require('http')
const httpServer = http.createServer();

httpServer.listen(3000, () => { console.log("Server is listening."); })

// httpServer.on("connection",(connection)=>{
//     // console.log(connection.localAddress);
//     // console.log(connection.localPort);
//     console.log(connection.remoteAddress);
//     console.log(connection.remotePort);
// })

httpServer.on("request", (req,res)=>{
    console.log(req.method);
    res.write("Hello there")
    res.end()
})

function get(){
    httpServer.getConnections((err,count)=>{
        console.log("Number of connection:", count);
    })

    setTimeout(get, 1000)
}

get()