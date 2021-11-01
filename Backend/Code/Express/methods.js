const express = require('express');
const app = express();


app.use(express.json());

app.listen(3000);


// let users = {};

let users = [{
    'id': 1,
    "name": "Bob"
},
{
    'id': 2,
    "name": "Alice"
},
{
    'id': 3,
    "name": "Adam"
}]


//GET
// app.get('/users', (req, res) => {
//     res.send(users);
// })

// //POST
// app.post('/users', (req, res) => {
//     console.log(req.body);
//     users = req.body;
//     res.json({
//         message: "Data received successfully",
//         user: req.body
//     });
// });

// //PATCH
// app.patch('/users', (req, res) => {
//     console.log("req.body->", req.body);

//     let dataToBeUpdatedInOriginalObject = req.body;
//     for (key in dataToBeUpdatedInOriginalObject) {
//         users[key] = dataToBeUpdatedInOriginalObject[key];
//     }

//     res.json({
//         message: "Data updated successfully"
//     })
// })

// //DELETE
// app.delete('/users', (req, res) => {
//     users = {};
//     res.json({
//         message: "Data deleted successfully"
//     })
// })

/////////////////////////////////

// app.get('/users/:id', (req,res)=>{
//     res.send("User ID Received");
//     console.log(req.params.id);
// })

// app.get('/users/:username', (req,res)=>{
//     console.log(req.params.username);
//     console.log(req.params)
//     res.send("Username received");
// })

app.get('/users', (req,res)=>{
    console.log("Hello");
    console.log(req.query);
    // res.send(users);
})