const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');

module.exports = authRouter

authRouter
    .route('/signup')
    .get(middleware, getSignUp, middleware2)
    .post(postSignUp)

authRouter
    .route('/login')
    .post(loginUser)

authRouter
    .route('/signup')
    .get(middleware, getSignUp, middleware2)
    .post(postSignUp);
function middleware(req, res, next) {
    console.log("Middleware encountered");
    next();
}
function middleware2(req, res, next) {
    console.log("Middleware 2 ended req/res cycle");
    res.sendFile('./public/index.html', { root: __dirname });
}

function getSignUp(req, res, next) {
    console.log("getSignUp encountered");
    // res.sendFile('./public/index.html', {root:__dirname});
    next();
}

//now make sign up page

async function postSignUp(req, res) {
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


async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt->compare
                if (user.password == data.password) {
                    return res.json({
                        message: "User has logged in",
                        userDetails: data
                    });
                }
                else {
                    return res.json({
                        message: "Wrong credentials"
                    })
                }
            }
            else {
                return res.json({
                    message: "User does not exist"
                })
            }
        }
        else{
            return res.json({
                message: "Please enter E-Mail ID"
            });
        }
    }
    catch (err) {
        res.statusCode = 500;
        return res.json({
            message: err.message
        })
    }
}

module.exports = authRouter;