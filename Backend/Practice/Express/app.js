const express = require('express');
const app = express()
 
// app.get('/', (req, res) =>{
//   res.send('<h1>Hello World</h1>');
// })
 
// app.get('/about', (req, res) =>{
//   res.send('<h1>About</h1>');
// })

//Alternatives

app.get('/',(req, res)=>{
  // res.send('<h1>Hello World</h1>');
  res.sendFile('E:\\Snippets\\Backend\\Practice\\Express\\views\\index.html');
});

app.get('/about', (req, res)=>{
  res.sendFile('./views/about.html', 
  {root:__dirname});
});

//redirects
app.get('/aboutUs', (req, res)=>{
  res.redirect('/about');
});

//404 page

// app.use((req, res)=>{
//   res.sendFile('./views/404.html', {root: __dirname});
// })
//still shows status:200

//sol 1
// app.use((req, res)=>{
//   res.statusCode = 404;
//   res.sendFile('./views/404.html', {root: __dirname});
// })

//sol 2: chaining
app.use((req, res)=>{
  // res.statusCode = 404;
  res.status(404).sendFile('./views/404.html', {root: __dirname});
})
app.listen(3000);