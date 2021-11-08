const express = require('express');
const userRouter = express.Router();
const {getUser, postUser, deleteUser, updateUser, getUserByID} = require('../controller/userController')

const protectRoute = require("./authHelper");

userRouter
    .route('/')
    .get(protectRoute, getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

    
userRouter
    .route('/getCookies')
    // .get(getCookies)
    
userRouter
    .route('/setCookies')
    // .get(setCookies)

    userRouter
        .route('/:id')
        .get(getUserByID);




///////ProtectRoute
// // let isLoggedIn = false; //user logged in or not
// function protectRoute(req,res,next){
//     // if(isLoggedIn){
//     if(req.cookies.isLoggedIn){
//         next();
//     }
//     else{
//         return res.json({
//             message: "Operation not allowed"
//         })
//     }
// }
    

module.exports = userRouter;