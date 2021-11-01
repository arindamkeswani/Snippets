const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    console.log("Request made from browser to server at port 3000");

    console.log(req.url);
    console.log(req.method); //request type

    res.setHeader('Content-Type', 'text/html');
    path= "./views";

    switch(req.url){
        case '/':
            path+="/index.html";
            break;
        case '/about':
            res.statusCode = 200;
            path+="/about.html";
            break;
        case '/about-abcdef':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        default:
            res.statusCode = 404;
            path+="/404.html";
    }

    fs.readFile(path, (err, fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(fileData);
            res.end();
        }
    })
    
})


server.listen(3000, 'localhost', ()=>{
    console.log("Server is listening");
})