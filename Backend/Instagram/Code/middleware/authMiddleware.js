import jwt from "jsonwebtoken";
import secret from "../secrets.js"

function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    // console.log(token);
    if(token==null){
        res.json({
            message: "Authentication failed.",
            success: 0
        })
    }
    jwt.verify(token, secret, (err, result)=>{
        if(err){
            res.json({
                success: 0,
                message: err.message
            })
        }
        else{
            next();
        }
    })
}

export default authMiddleware;