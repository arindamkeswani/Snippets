const express = require('express');

const userRouter = express.Router();
let multer = require('multer');
const{getUser, deleteUser, updateUser, getAllUsers, uploadProfileImage} = require('../controller/userController');

const userModel = require('../models/userModels');
// const protectRoute = require('./authHelper')
const {login, signup, isAuthorized, protectRoute, logout} = require('../controller/authController');
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



const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'foodapp/public/images')
    },
    filename: function(req, file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
})

const filter = function(req, file,cb){
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }
    else{
        cb(new Error("Uploaded file must be an image."), false);
    }
}

const upload = multer({
    storage: multerStorage,
    filter: filter
})

userRouter.post('/ProfileImage', upload.single('photo'), uploadProfileImage)
userRouter.get('/ProfileImage', (req,res)=>{
    res.sendFile('E:/Snippets/Backend/Code/Express/views/multer.html')
})

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

userRouter 
    .route("/logout")
    .get(logout)

module.exports = userRouter;