const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModels');
var jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets').JWT_KEY;
const {sendMail} =require('./utility/nodemailer');


module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) { //email ID has been entered
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //use bcrypt to compare
                if (user.password == data.password) { //passwords match

                    // res.cookie('isLoggedIn', true, {httpOnly: true});
                    let uid = user['_id']; //payload
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });

                    return res.json({
                        message: "User has logged in.",
                        userDetails: data
                    })
                }
                else { //passwords do not match
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
        else { //email ID field is blank
            return res.json({
                message: "Please enter a valid e-mail address or sign up"
            });
        }
    }
    catch (err) {
        res.statusCode = 500
        return res.json({
            message: err.message
        })
    }

}

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup", user)
        if (user) {
            console.log(user);
            return res.json({
                message: "User signed up",
                data: user
            })
        }
        else {
            return res.json({
                message: "Error occured while signing up."
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401) //unauthorized access
            res.json({
                message: "Operation not allowed."
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {

        let token;

        if (req.cookies.login) {
            token = req.cookies.login;

            let payload = jwt.verify(token, JWT_KEY); //return payload if new sign = req's sign
            // console.log(payload)

            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;

                next();
            }
            else {
                return res.json({
                    message: "User is not verified"
                })
            }
        }
        else {
            const client = req.get('User-Agent');
            if (client.includes("Mozilla") == true) { //browser
                res.redirect("/login")
            }
            else {
                return res.json({
                    message: "Please log-in again."
                })
            }
        }
    }
    catch (err) {
                res.status(500);
                res.json({
                    message: err.message
                })
            }
        }

        module.exports.forgotpassword = async function forgotpassword(req, res) {
            let { email } = req.body;
            try {
                const user = await userModel.findOne({ email: email });
                if (user) {
                    const resetToken = user.createResetToken(); //handle creation of reset token

                    //http://abc.com/resetpassword/resetToken
                    let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
                    // console.log(resetpasswordlink);

                    //next, we send this link to the user via email
                    let obj={
                        resetPasswordLink: resetPasswordLink,
                        email: email
                    }
                    sendMail("resetpassword", obj);
                }
                else {
                    return res.json({
                        message: "E-mail ID is not signed up."
                    })
                }
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message
                })

            }
        }

        module.exports.resetpassword = async function resetpassword(req, res) {

            try {
                const token = req.params.token;
                let { password, confirmedPassword } = req.body;

                const user = await userModel.findOne({ resetToken: token });

                if (user) {
                    user.resetPasswordHandler(password, confirmedPassword) //save the new password in the database
                    await user.save();

                    res.json({
                        message: "Password changed successfully. Please log-in again."
                    })

                }
                else {
                    res.json({
                        message: "Invalid user or token"
                    })
                }
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
        }

        module.exports.logout = function logout(req, res) {
            res.cookie('login', '', { maxAge: 1 })

            res.json({
                message: "User logged out successfully."
            })
        }