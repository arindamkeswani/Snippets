const express = require('express');
// const app = express();
const userRouter = express.Router();
const {getUser,getAllUsers , deleteUser, updateUser } = require('../controller/userController')
const {signup, login, isAuthorized, protectRoute} = require('../controller/authController')
const{forgotpassword, resetpassword} = require('../controller/authController');

//user options
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)

userRouter
    .route('/forgotpassword')
    .post(forgotpassword)

userRouter
    .route('/resetpassword/:token')
    .post(resetpassword)

//profile page
userRouter.use(protectRoute)
userRouter
    .route('/userProfile')
    .get(getUser)

//admin specific function
userRouter.use(isAuthorized(['admin']))
userRouter  
    .route('')
    .get(getAllUsers)

module.exports = userRouter;