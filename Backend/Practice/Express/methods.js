const express = require('express');
const app = express();

//Middleware function used in POST method to convert front-end data to JSON format
app.use(express.json()); //3

app.listen(3000);

let users={};

app.get('/users', (req, res)=>{
    res.send(users);
})

//data being sent from front to back comes in body of request
app.post('/users', (req, res)=>{
    console.log(req.body);
    users = req.body;//4

    //2
    res.json({
        message: "data received successfully",
        user: req.body
    })
});

//5 update

app.patch('/users', (req, res)=>{
    console.log('req.body->',req.body);


    //6
    let dataToBeUpdated= req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    //6

    //update data in users object
    res.json({
        message:"data updated successfully"
    })
})


//7 delete
app.delete('/users', (req,res)=>{
    users = {};
    res.json({
        message: "Data has been deleted"
    });
});