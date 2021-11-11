const express = require('express');

const userRouter = express.Router();

const{getUser, deleteUser, updateUser, getAllUsers} = require('../controller/userController');

const userModel = require('../models/userModels');
// const protectRoute = require('./authHelper')
const {login, signup, isAuthorized, protectRoute} = require('../controller/authController');
const {forgotpassword, resetpassword}= require('../controller/authController');
//user options
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/signup")
    .post(signup)
    

userRouter
    .route("/login")
    .post(login)

userRouter
    .route("/forgotpassword")
    .post(forgotpassword)

userRouter
    .route("/resetpassword/:token")
    .post(resetpassword)

//profile page
userRouter.use(protectRoute)
userRouter  
    .route('/userProfile')
    .get(getUser)

    
    //admin specific function
userRouter.use(isAuthorized(['admin']))
userRouter
    .route("")
    .get(getAllUsers)


module.exports = userRouter;