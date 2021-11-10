const { application } = require('express');
const express = require('express');
const userRouter = express.Router();
const {getUser,getAllUsers , deleteUser, updateUser } = require('../controller/userController')

const protectRoute = require("./authHelper");

//user options
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

//profile page
app.use(protectRoute)
userRouter
    .route('/userProfile')
    .get(getUser)

//admin specific function
app.use(isAuthorized(['admin']))
userRouter  
    .route('')
    .get(getAllUsers)

module.exports = userRouter;