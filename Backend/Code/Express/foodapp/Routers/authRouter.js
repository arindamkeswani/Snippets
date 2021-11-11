const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModels');
var jwt = require('jsonwebtoken');
const JWT_KEY = require('../../secrets').JWT_KEY;

// function getSignUp(req,res,next){
//     console.log("getSignUp encountered");
//     // res.sendFile("./public/index.html", {root:__dirname});
//     next();
// }

// async function postSignUp(req,res){
//     let dataObj = req.body;
//     // console.log("Backend",dataObj);

//     let newUser = await userModel.create(dataObj);
//     res.json({
//         message: "User signed up",
//         data:newUser
//     })
// }

/////////////LOGIN
async function loginUser(req,res){
    try{
        let data = req.body;
        if(data.email){ //email ID has been entered
            let user = await userModel.findOne({email: data.email});
            if(user){
                //use bcrypt to compare
                if(user.password == data.password){ //passwords match

                    // res.cookie('isLoggedIn', true, {httpOnly: true});
                    let uid = user['_id']; //payload
                    let token = jwt.sign({payload: uid}, JWT_KEY);
                    res.cookie('login', token, {httpOnly: true});

                    return res.json({
                        message: "User has logged in.",
                        userDetails: data
                    })
                }
                else{ //passwords do not match
                    return res.json({
                        message:"Wrong credentials"
                    })
                }
            }
            else{
                return res.json({
                    message: "User does not exist"
                })
            }

        }
        else{ //email ID field is blank
            return res.json({
                message: "Please enter a valid e-mail address or sign up"
            });
        }
    }
    catch(err){
        res.statusCode = 500
        return res.json({
            message: err.message
        })
    }

}
module.exports = authRouter;