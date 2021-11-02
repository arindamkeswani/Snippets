const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

function getUser(req,res){
    res.send(users);

    //CRUD video
    // let allUsers = await userModel.find();
    // res.json({message:"List of all users:", 
    //         data: allUsers});
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


function getSignUp(req,res, next){
    console.log("getSignUp encountered");
    // res.sendFile('./public/index.html', {root:__dirname});
    next();
}

//now make sign up page

function postSignUp(req,res){
    //data is in body of request. Fetch it
    let obj = req.body;
    console.log("backend",obj);
    res.json({
        message: "User signed up.",
        data:obj
    });
}


//MONGODB and MONGOOSE

//promise based function

db_link='mongodb+srv://admin:foodappadmin@cluster0.t8urz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("DB Connected");
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type:String, 
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    } 
});

//model

//model name, shcema name
const userModel = mongoose.model('userModel', userSchema);

(async function createUser(){
    let user={
        name:'Arindam 2',
        email:"aaaa@gmail.com",
        password: "12345678",
        confirmPassword:"12345678"
    }

    let data = await userModel.create(user);
    console.log(data);
})()
