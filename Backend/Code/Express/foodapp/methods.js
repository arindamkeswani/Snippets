const express = require('express');
const app = express();
const mongoose = require("mongoose");
const emailValidator = require('email-validator');
const userModel = require('./models/userModels');
const cookieParser = require('cookie-parser');

var cors = require('cors');
app.use(cors())
app.use(express.static('public/build'));

app.use(express.json());

// app.listen(3000);
const port=process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`server listening on port ${port}`);
})
app.use(cookieParser());

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


const userRouter = require('./Routers/userRouter');
app.use("/user", userRouter);

const authRouter = require('./Routers/authRouter');
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



/////////////SIGN UP
function getSignUp(req,res,next){
    console.log("getSignUp encountered");
    // res.sendFile("./public/index.html", {root:__dirname});
    next();
}

async function postSignUp(req,res){
    let dataObj = req.body;
    // console.log("Backend",dataObj);

    let newUser = await userModel.create(dataObj);
    res.json({
        message: "User signed up",
        data:newUser
    })
}




//plan router
const planRouter = require('./Routers/planRouter');
app.use("/plans", planRouter)

const reviewRouter = require('./Routers/reviewRouter');
app.use("/reviews", reviewRouter)

const bookingRouter = require('./Routers/bookingRouter');
app.use("/booking", bookingRouter)
