var jwt = require('jsonwebtoken');
const JWT_KEY = require('../../secrets').JWT_KEY;

function protectRoute(req, res, next){
    if(req.cookies.login){
        // console.log(req.cookies);

        let isVerified = jwt.verify(req.cookies.login, JWT_KEY); //return true if new sign = req's sign, otherwise false

        if(isVerified){
            next();
        }
    }
    else{
        return res.json({
            message: "User is not verified"
        })
    }
}

module.exports = protectRoute;

