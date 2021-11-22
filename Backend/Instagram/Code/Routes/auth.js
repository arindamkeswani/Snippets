import express from "express";
import connection from "../db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware/authMiddleware.js"
import secret from "../secrets.js"
const authRouter = express.Router();


authRouter.post("/signup", async (req, res)=>{
    let {fullname, password, email, profile_pic} = req.body;
    password = await bcrypt.hash(password, 10)
    console.log(fullname, password, email);
    connection.query("insert into users(fullname, email, password, profile_pic) values(?,?,?,?)", [fullname, email, password, profile_pic], (err,result)=>{
        if(err){
            res.json({
                success:0,
                message: err.message
            })
        }

        else if(result){
            res.json({
                email, 
                fullname, 
                profile_pic
            })
        }
    })
})

authRouter.post("/login", async (req,res)=>{
    let {email, password} = req.body;
    connection.query("select * from users where email=?", [email], async (err,result)=>{
        if(err){
            res.json({
                success:0,
                message:err.message
            })
        }
        else{
            if(result.length>0){
                const ans = await bcrypt.compare(password, result[0].password)
                if(ans){
                    delete result[0].password
                    const token = await jwt.sign({...result[0]}, secret, {expiresIn: '10h'})
                    res.json({
                        ...result[0],
                        token
                    })
                }
                else{
                    res.json({
                        error: "Password is incorrect",
                        success:0
                    })
                }
            }
            else{
                res.json({
                    error: "User not found",
                    success:0
                })
            }
        }
    })
})

export default authRouter;