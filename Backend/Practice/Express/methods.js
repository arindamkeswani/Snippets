const express = require('express');
const app = express();

//Middleware function used in POST method to convert front-end data to JSON format
app.use(express.json()); //3

app.listen(3000);

let users=[
    {
        'id': 1,
        'name': "Bob"
    },
    {
        'id':2,
        'name': "Alice"
    },
    {
        'id':3,
        'name': "Adam"
    }
];

const userRouter = express.Router();
app.use("/user", userRouter)

//mini app
userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserByID)

// app.get('/users', (req, res)=>{
//     res.send(users);
// })

// //data being sent from front to back comes in body of request
// app.post('/users', (req, res)=>{
//     console.log(req.body);
//     users = req.body;//4

//     //2
//     res.json({
//         message: "data received successfully",
//         user: req.body
//     })
// });

// //5 update

// app.patch('/users', (req, res)=>{
//     console.log('req.body->',req.body);


//     //6
//     let dataToBeUpdated= req.body;
//     for(key in dataToBeUpdated){
//         users[key] = dataToBeUpdated[key];
//     }
//     //6

//     //update data in users object
//     res.json({
//         message:"data updated successfully"
//     })
// })


// //7 delete
// app.delete('/users', (req,res)=>{
//     users = {};
//     res.json({
//         message: "Data has been deleted"
//     });
// });

////////////////////
//video 9

// app.get('/users/:id', (req, res)=>{
//     res.send("User ID received:");
//     console.log(req.params.id);
// })

// app.get('/users/:username', (req, res)=>{
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send("Username received:");
// })


// app.get('/users', (req, res)=>{
//     console.log("Hello");
//     console.log(req.query);
//     res.send(users);
// })

////////////////////////MOUNTING

function getUser(req,res){
    res.send(users);
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    })
}

function updateUser(req,res){
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
}

function deleteUser(req,res){
    users = {};
    res.json({
        message: "Data has been deleted"
    });
}

function getUserByID(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0; i<users.length; i++){
        if(users[i]['id'] == paramId){
            obj = users[i];
        }
    }

    res.json({
        message: "Request received",
        data:obj
    })
}

////////////////////////////////////////////////////////////////
//SIGN UP FORM VIDEO
const authRouter = express.Router();
app.use("/auth", userRouter)

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)


function getSignUp(req,res){
    res.sendFile('');
}

//now make sign up page