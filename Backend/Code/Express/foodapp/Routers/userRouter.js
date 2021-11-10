const express = require('express');

const userRouter = express.Router();

const{getUser, postUser, deleteUser, updateUser, getUserById} = require('../controller/userController');

const userModel = require('../models/userModels');
const protectRoute = require('./authHelper')
userRouter
    .route('/')
    .get(protectRoute, getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)


// userRouter
//     .route('/getCookies')
//     .get(getCookies)

// userRouter
//     .route('/setCookies')
//     .get(setCookies)

userRouter
    .route('/:id')
    .get(getUserById)





    

module.exports = userRouter;