import express from "express";
import jwt from "jsonwebtoken";
import connection from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import secret from "../secret.js";


const friendsRouter = express.Router();

//send request
friendsRouter.post('/sendrequest', authMiddleware, (req, res) => {
    const { friendId } = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user)=>{
        if (err) {
            res.send({
                success: 0,
                message: "Request sent succcessfully"
            })
        }
        else {
            connection.query("insert into friend_requests(sender_id, receiver_id) values (?,?)", [user.id, friendId], (err, result) => {
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
                            message: "Friend request sent."
                        })
                    }
                }
            })
        }
    })
})

friendsRouter.post('/acceptrequest', authMiddleware, (req, res) => {
    const { friendId } = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        connection.query("update friend_requests set status=1 where sender_id=? and receiver_id=?", [friendId, user.id], (err, result) => {
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
                        message: "Request accepted."
                    })
                }
            }
        })
    })
})


//reject request
friendsRouter.delete('/rejectrequest/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers['authorization']
    const token = autrhHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        connection.query("delete from friend_requests where id=?", [id], (err, result) => {
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
                        message: "Request rejected."
                    })
                }
            }
        })
    })
})

//get pending requests
friendsRouter.get('/pendingrequests', authMiddleware, (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        connection.query("select * from friend_requests where receiver_id=? and status=0", [user.id], (err, result) => {
            if (err) {
                res.send({
                    success: 0,
                    error: err.message
                })
            }
            else{
                if(result){
                    res.json({
                        success:1,
                        pending: result
                    })
                }
            }
        })
    })
})

//get my friends
friendsRouter.get('/myfriends', authMiddleware, (req, res)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user)=>{
        connection.query("select fullname,email,profile_pic from friend_requests inner join users on users.id=friend_requests.receiver_id where sender_id=? and status =1", [user.id], (err,result)=>{
            if (err) {
                res.send({
                    success: 0,
                    error: err.message
                })
            }
            else{
                if(result){
                    res.json({
                        success:1,
                        friends: result
                    })
                }
            }
        })
    })
})

//get all users except me
friendsRouter.get('/allusers/:query', authMiddleware, (req,res)=>{
    const {query} = req.params || "";
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user)=>{
        connection.query(`select email,fullname,id from users where id != ? and fullname like '%${query}%' `, [user.id], (err,result)=>{
            if(err){
                res.send({
                    success:0,
                    error: err.message
                })
            }
            else{
                if(result){
                    res.json({
                        success: 1,
                        result
                    })
                }
            }
        })
    })
})

export default friendsRouter