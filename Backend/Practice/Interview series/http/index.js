let http = require('http');
const httpServer = http.createServer();
httpServer.listen(8080, () => console.log("listening"));

httpServer.on("connection", (connection) => {
    // console.log(connection);
    console.log(connection.localAddress);
    console.log(connection.localPort);
    console.log(connection.remoteAddress);
    console.log(connection.remotePort);
})

httpServer.on("request", (req, res) => {
    console.log(req.method);
    res.write("Hello")
    res.end()

})

// httpServer.getConnections((err, count)=>console.log(`Number of connections ${count}`))

function getC() {
    httpServer.getConnections((err, count) => console.log(`Number of connections ${count}`))
    setTimeout(getC
    ,1000)
}
getC()