// let isLoggedIn = false; //user logged in or not
function protectRoute(req,res,next){
    // if(isLoggedIn){
    if(req.cookies.isLoggedIn){
        next();
    }
    else{
        return res.json({
            message: "Operation not allowed"
        })
    }
}

module.exports = protectRoute;