//server creation
//_______________________________________                                            //// Code 1
//1. http module

const http = require('http'); //retrieves http module
const fs = require('fs');
const _ = require('lodash');
//now we want to create server

//run everytime a request is made
const server = http.createServer((req, res)=>{
    console.log('request made from browser to server');
    //req obj contains data such as path of request, what is the request, type of request, meta data, host
    //response object will send the info

    let num = _.random(0,20);
    console.log(num);

    function greet(){
        console.log("Hello!");
    }

    greet();
    greet();
    //_______________________________________                                            //// Code 2 
     //show in code 2
    // console.log(req);
    console.log(req.method); //type of request: get, post, patch, delete | "GET" received as output
    console.log(req.url); //url of the requester | since we are calling from out own device, we get "/", no other url. Try with aboutUs 
    //helps us know what page is being requested by the requester

    // when we send response, we need to specify what type of content are we sending pdf, excel file, or anythign else
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello World');
    // res.end();

    //show output and network tab
    //______________________________ Code 2 

    //______________________________ Code 3
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello World</h1>');
    // res.write('<h2>Hello World</h2>');
    // res.end();
    //show output and network tab
    //______________________________ Code 3

    //______________________________ code 4
    res.setHeader('Content-Type', 'text/html');

    let path = './views'
    
    switch(req.url){
        case '/':
            path+='/something.html';
            break;
        case '/about':
            path+='/about.html';
            break;

        //SHOW BELOW CASE IN STATUS CODE VIDEO
        case '/about-me':
            // res.setHeader('Location', '/about');
            res.statusCode=301; //permanent redirect
            res.end();
        default:
            res.statusCode = 404; //SHOW IN STATUS CODE VIDEO
            path+='/404.html';
            break;
        
    }

    // fs.readFile("views/something.html", (err, fileData)=>{
    fs.readFile(path, (err, fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            // res.write(fileData);
            // res.end();

            // res.write(fileData);
            res.end(fileData);
        }
    })
    //______________________________ code 4



})

//port number, host(request sender),callback function
server.listen(3000, 'localhost',()=>{
    console.log('server is listening');
}); 