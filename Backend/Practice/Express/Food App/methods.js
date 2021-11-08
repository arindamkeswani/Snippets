const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// const emailValidator = require('email-validator');
const userModel = require('./models/userModel');
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
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserByID);

//SIGN UP FORM VIDEO
const authRouter = express.Router();
app.use("/auth", authRouter)

authRouter
    .route('/signup')
    .get(middleware, getSignUp, middleware2)
    .post(postSignUp);
function middleware(req, res, next){
    console.log("Middleware encountered");
    next();
}
function middleware2(req, res, next){
  console.log("Middleware 2 ended req/res cycle");
  res.sendFile('./public/index.html', {root:__dirname});
}
/////////////////////////MOUNTING

async function getUser(req,res){
    // res.send(users);

    //CRUD video
    let allUsers = await userModel.find();
    // let allUsers = await userModel.findOne({name:"Arindam"});
    res.json({message:"List of all users:", 
            data: allUsers});
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    })
}

async function updateUser(req,res){
    // console.log('req.body->',req.body);


    // //6
    // let dataToBeUpdated= req.body;
    // for(key in dataToBeUpdated){
    //     users[key] = dataToBeUpdated[key];
    // }
    // //6

    // //update data in users object
    // res.json({
    //     message:"data updated successfully"
    // })

    //CRUD video
    let dataToBeUpdated= req.body;
    let user = await userModel.findOneAndUpdate({email: "aaa@gmail.com"}, dataToBeUpdated)
    res.json({
        message:"data updated successfully"
    })
}

async function deleteUser(req,res){
    // users = {};
    // res.json({
    //     message: "Data has been deleted"
    // });

    let user = await userModel.findOneAndDelete({email:"testhook@gmail.com"});

    res.json({
        message:"data has been deleted",
        data:user
    })
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


function getSignUp(req,res, next){
    console.log("getSignUp encountered");
    // res.sendFile('./public/index.html', {root:__dirname});
    next();
}

//now make sign up page

async function postSignUp(req,res){
    //data is in body of request. Fetch it
    // let obj = req.body;
    // console.log("backend",obj);
    // res.json({
    //     message: "User signed up.",
    //     data:obj
    // });

    //CRUD video
    let dataObj = req.body
    let user = await userModel.create(dataObj);

    res.json({
        message: "user signed up",
        data: user
    })
}


//MONGODB and MONGOOSE

//promise based function



