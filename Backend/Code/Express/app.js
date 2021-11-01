const express = require('express')
const app = express()

//Full path
app.get('/', (req, res)=>{
    res.sendFile('E:\\Snippets\\Backend\\Code\\Express\\views\\index.html');
}) 

//relative path + dirname

app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: __dirname});
})

app.listen(3000)

//redirecting
app.get('/aboutUs', (req, res)=>{
    res.redirect('/about');
})

//404 - Page not found
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})