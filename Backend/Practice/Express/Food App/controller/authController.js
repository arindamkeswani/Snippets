const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../Food App/secrets').JWT_KEY;


//sign up user
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body
        let user = await userModel.create(dataObj);
        if (user) {
            console.log(user);
            return res.json({
                message: "user signed up",
                data: user
            })
        }
        else {
            return res.json({
                message: "Error occured while signing up.",
                data: user
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//login user
module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt->compare
                if (user.password == data.password) {

                    //in protect route video
                    // res.cookie('isLoggedIn',true,{httpOnly: true});
                    // console.log(JWT_KEY);
                    //JWT
                    let uid = user['_id']; //uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    //
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
        else {
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

//check the user's role [admin, restaurant owner, normal user, delivery boy]
module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {
        console.log(req.role);
        if (roles.includes(req.role) == true) {
            next(); //will run next middleware, getAllUsers
        }
        else {
            res.status(401); //unauthorized access
            res.json({
                message: "Operation not authorized."
            })
        }
    }
}

//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY); //will return true if new signature and request's sign is same, otherwise false

            if (payload) {
                const user = await userModel.findById(payload.payload);
                // console.log(user);
                req.role = user.role;
                req.id = user.id;
                // console.log(payload,req.role,req.id);
                next();
            }
            else {
                res.json({
                    message: "User not verified"
                })
            }
        }
        else {
            //can replace it with a redirect
            return res.json({
                message: "Please login again."
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
}

//forgot password
module.exports.forgotpassword = async function forgotpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {

            //createResetToken is used to create a new token. It is attached to the schema
            const resetToken = user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

            //next, we send a mail to the user using nodemailer, done later
        }
        else {
            return res.json({
                message: "Email ID is not signed up."
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//reset password
module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token })
        if (user) {


            user.resetPasswordHandler(password, confirmPassword); //this function saves the new password in the database
            await user.save();

            res.json({
                message: "Password changed successfully. Please log-in again"
            })
        }
        else {
            res.json({
                message: "Invalid user or token."
            })
        }
    
    }
    catch (err) {
    return res.json({
        message: err.message
    })
}
}