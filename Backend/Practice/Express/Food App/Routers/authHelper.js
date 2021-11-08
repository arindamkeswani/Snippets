const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets.js');


// let isLoggedIn = false; //user logged in or not
function protectRoute(req,res,next){
    // if(isLoggedIn){
    if(req.cookies.login){
        //JWT
        console.log(req.cookies);
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY); //will return true if new signature and request's sign is same, otherwise false
        
        if(isVerified){
            next();
        }
        else{
            res.json({
                message:"User not verified"
            })
        }
    }
    else{
        return res.json({
            message: "Operation not allowed"
        })
    }
}

module.exports = protectRoute;