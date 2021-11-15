const express = require('express');
const multer = require('multer');
// const app = express();
const userRouter = express.Router();
const {getUser,getAllUsers , deleteUser, updateUser,updateProfileImage } = require('../controller/userController')
const {signup, login, isAuthorized, protectRoute} = require('../controller/authController')
const{forgotpassword, resetpassword, logout} = require('../controller/authController');

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


const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req,file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
})

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
  }


//multer for file upload
const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

//WRITE MULTER CODE ABOVE PROTECT ROUTE
userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
//get request
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("E:/Snippets/Backend/Practice/Express/Food App/view/multer.html");
});

userRouter
    .route('/logout')
    .get(logout)

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