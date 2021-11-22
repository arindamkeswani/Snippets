import express from "express";
import connection from "../db.js"
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware/authMiddleware.js"
import secret from "../secrets.js"
const friendsRouter = express.Router();


//send request
friendsRouter.post("/sendrequest", authMiddleware, (req, res) => {
    const { friendId } = req.body;
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: err.message
            })
        }
        else {
            connection.query("insert into friend_requests(sender_id, receiver_id) values(?,?)", [user.id, friendId], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        mesage: err.message
                    })
                }
                else {
                    if (result) {
                        res.json({
                            success: 1,
                            mesage: "Request sent successfully."
                        })
                    }
                }
            })
        }
    })

})

//accepting request
friendsRouter.post("/acceptrequest", authMiddleware, (req, res) => {
    const { friendId } = req.body;
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: err.message
            })
        }
        else {
            connection.query("update friend_requests set status=1 where sender_id=? and receiver_id=?", [friendId, user.id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        mesage: err.message
                    })
                }
                else {
                    if (result) {
                        res.json({
                            success: 1,
                            mesage: "Request accepted."
                        })
                    }
                }
            })
        }
    })
})

//reject request
friendsRouter.delete("/rejectrequest/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: err.message
            })
        }
        else {
            connection.query("delete from friend_requests where id=?", [id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        mesage: err.message
                    })
                }
                else {
                    if (result) {
                        res.json({
                            success: 1,
                            mesage: "Request rejected."
                        })
                    }
                }
            })
        }
    })
})

//pending requests
friendsRouter.get("/pendingrequests", authMiddleware, (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: err.message
            })
        }
        else {
            connection.query("select * from friend_requests where receiver_id=? and status = 0", [user.id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        mesage: err.message
                    })
                }
                else {
                    if (result) {
                        res.json({
                            success: 1,
                            pending: result
                        })
                    }
                }
            })
        }
    })
})

//get my friends
friendsRouter.get("/myfriends", authMiddleware, (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        connection.query("select fullname, email,profile_pic from friend_requests inner join users on users.id = friend_requests.receiver_id where sender_id=? and status=1", [user.id], (err, result) => {

            if (err) {
                res.send({
                    success: 0,
                    error: err.message
                })
            }
            else {
                if (result) {
                    res.json({
                        success: 1,
                        friends: result
                    })
                }
            }
        })
    })
})

//get all users except me using name
friendsRouter.get("/allusers/:query", authMiddleware, (req,res)=>{
    const {query} = req.params || ""

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err,user)=>{
        connection.query(`select fullname, email, profile_pic from users where id!=? and fullname like '%${query}%'`, [user.id], (err,result)=>{
            if (err) {
                res.json({
                    success: 0,
                    mesage: err.message
                })
            }
            else {
                if (result) {
                    res.json({
                        success: 1,
                        users: result
                    })
                }
            }
        })
    })

})
export default friendsRouter;