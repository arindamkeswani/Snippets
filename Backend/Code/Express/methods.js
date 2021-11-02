const express = require('express');
const app = express();
const mongoose = require("mongoose");

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


const userRouter = express.Router();

app.use("/user", userRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)

const authRouter = express.Router();

app.use("/auth", authRouter)

authRouter
    .route("/signup")
    .get(middleware, getSignUp, middleware2)
    .post(postSignUp)


function middleware(req,res,next){
    console.log("Midddleware");
    next();
}

function middleware2(req,res,next){
    console.log("Midddleware 2 ended req res cycle");
    res.sendFile("./public/index.html", {root:__dirname});
}

app.get('/users', (req,res)=>{
    console.log("Hello");
    console.log(req.query);
    // res.send(users);
})

////////////////MOUNTING

function getUser(req, res){
    res.send(users);
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

function updateUser(req,res){
    console.log("req.body->", req.body);

    let dataToBeUpdatedInOriginalObject = req.body;
    for (key in dataToBeUpdatedInOriginalObject) {
        users[key] = dataToBeUpdatedInOriginalObject[key];
    }

    res.json({
        message: "Data updated successfully"
    })
}

function deleteUser(req,res){
    users = {};
    res.json({
        message: "Data deleted successfully"
    })
}

function getUserById(req, res){
    let paramId = req.params.id;
    let obj = {}

    for(let i=0; i<users.length; i++){
        if(users[i]['id'] == paramId){
            obj = users[i];
        }
    }

    res.json({
        message: "Request received",
        data: obj
    })
}

/////////////SIGN UP
function getSignUp(req,res,next){
    console.log("getSignUp encountered");
    // res.sendFile("./public/index.html", {root:__dirname});
    next();
}

function postSignUp(req,res){
    let obj = req.body;
    console.log("Backend",obj);
    res.json({
        message: "User signed up",
        data:obj
    })
}

db_link = "mongodb+srv://admin:hfBZ0Hc1fhpMkCrU@cluster0.srt8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// hfBZ0Hc1fhpMkCrU
mongoose.connect(db_link)
.then(function(db){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8
    },
});

const userModel = mongoose.model('userModel', userSchema);

(async function createUser(){
    let user = {
        name: "Pepcoder",
        email:"pepcoder@gmail.com",
        password: "12345678",
        confirmPassword:"12345678"
    }

    let data = await userModel.create(user);
    console.log(data);
})()