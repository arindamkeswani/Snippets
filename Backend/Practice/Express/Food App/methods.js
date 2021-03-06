const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// const emailValidator = require('email-validator');
const userModel = require('./models/userModel');
const cookieParser = require('cookie-parser')
 //Middleware function used in POST method to convert front-end data to JSON format
app.use(express.json()); //3

app.listen(3000);
app.use(cookieParser());

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

const userRouter =require('./Routers/userRouter');
app.use("/user", userRouter)

//mini app

    //SIGN UP FORM VIDEO
const authRouter = require('./Routers/authRouter');  
app.use("/auth", authRouter)


/////plan Router
const planRouter = require('./Routers/planRouter');  ;
app.use("/plans", planRouter)


const reviewRouter = require('./Routers/reviewRouter');  ;
app.use("/reviews", reviewRouter)

const bookingRouter = require('./Routers/bookingRouter');
app.use('/booking', bookingRouter);