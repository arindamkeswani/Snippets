
const express = require('express');
const app = express();
const mongoose = require("mongoose");
// const emailValidator = require('email-validator');
// const userModel = require('./models/userModels');
// const cookieParser = require('cookie-parser');

var cors = require('cors');
app.use(cors())
app.use(express.static('view'));

app.use(express.json());

// app.listen(3000);
const port=process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`server listening on port ${port}`);
})
// app.use(cookieParser());

app.get('/', (req, res)=>{
    res.sendFile('E:\\Snippets\\Backend\\Twilio\\Practice\\SMS\\minimalist-login\\src\\view\\index.html');
}) 

const userRouter = require('./router/userRouter');
app.use("/user", userRouter);

// const authRouter = require('./Routers/authRouter');
// app.use("/auth", authRouter)

// authRouter
//     .route("/signup")
//     .get(middleware, getSignUp, middleware2)
//     .post(postSignUp)





