import express from "express";
import jwt from "jsonwebtoken";
import connection from "../db.js";
import secret from "../secrets.js"
import authMiddleware from "../middleware/authMiddleware.js";

const postRouter = express.Router();

//all posts
postRouter.get("/allPosts", authMiddleware, (req, res) => {
    connection.query("select fullname, email, profile_pic, video_url from posts p cross join users u on p.user_id = u.id", (err, result) => {
        if (err) {
            res.json({
                success: 0,
                message: err.message
            })
        }
        else {
            if (result.length > 0) {
                // console.log(result);
                res.json({
                    result,
                    success: 1
                })
            }
            else {
                res.json({
                    error: "No posts to view at this time.",
                    success: 1
                })
            }
        }
    });
})


//get post by ID 
postRouter.get("/:id", authMiddleware, (req, res) => {
    let id = req.params.id;
    connection.query("select fullname, email, profile_pic, video_url from posts p inner join users u on p.user_id = u.id where p.id=?", [id], (err, result) => {
        if (err) {
            res.json({
                success: 0,
                message: err.message
            })
        }
        else {
            if (result.length > 0) {
                res.json({
                    result: result[0],
                    success: 1
                })
            }
            else {
                res.json({
                    error: "Wrong post ID.",
                    success: 1
                })
            }
        }
    });
})

//get my posts
postRouter.get("/myposts/:id", authMiddleware, (req, res) => {
    let id = req.params.id
    connection.query("select fullname, email, profile_pic, video_url from posts p inner join users u on p.user_id = u.id where u.id=?", [id], (err, result) => {
        connection.query()
        if (err) {
            res.json({
                success: 0,
                message: err.message
            })
        }
        else {
            if (result) {
                res.json({
                    result: result,
                    success: 1
                })
            }
            else {
                res.json({
                    error: "No posts to show",
                    success: 1
                })
            }
        }
    });
})


postRouter.post("/dolike/:id", authMiddleware, (req, res) => {
    let id = req.params.id;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                message: "Authentication failed."
            })
        }
        else {
            connection.query("insert likes(user_id, post_id) values(?,?)", [user.id, id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    res.json({
                        success: 1,
                        message: "Liked the post."
                    })
                }
            })
        }

    })
})

postRouter.delete("/undolike/:id", authMiddleware, (req, res) => {
    let id = req.params.id;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                message: "Authentication failed."
            })
        }
        else {
            connection.query("delete from likes where user_id=? and post_id=?", [user.id, id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    res.json({
                        success: 1,
                        message: "Unliked the post."
                    })
                }
            })
        }

    })
})

postRouter.get("/checklike/:id", authMiddleware, (req, res) => {
    let id = req.params.id;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                message: "Authentication failed."
            })
        }
        else {
            connection.query("select * from likes where user_id=? and post_id=?", [user.id, id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    if(result.length>0){
                        res.json({
                            success:1,  
                        })
                    }
                    else{
                        res.json({
                            success:0,  
                        })
                    }
                }
            })
        }

    })
})

postRouter.get("/countlikes/:id", authMiddleware, (req,res)=>{
    const id = req.params.id;
    connection.query("select count(*) as count from likes where post_id=?",[id], (err, result)=>{
        if(err){
            res.json({
                success:0,
                message: err.message
            })
        }
        else{
            if(result.length>0){
                res.json({
                    result: result[0]
                })
            }
        }
    })
})


//add comment
postRouter.post("/comment/:id", authMiddleware, (req, res)=>{
    const id = req.params.id;
    const text = req.body.text;
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                message: "Authentication failed."
            })
        }
        else {
            connection.query("insert into comments(user_id, post_id, text) values(?,?,?)", [user.id, id, text], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    
                        res.json({
                            success:1,  
                            data: text
                        })
                    
                }
            })
        }

    })
})


//delete comment
postRouter.delete("/deletecomment/:id", authMiddleware, (req,res)=>{
    const id = req.params.id //comment
    connection.query("delete from comments where id=?",[id], (err, result)=>{
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        }
        else {
            
                res.json({
                    success:1,  
                    id: id
                })
            
        }
    })
})

postRouter.patch("/updatecomment/:id", authMiddleware, (req,res)=>{
    const id = req.params.id //comment
    const text=req.body.text
    connection.query("update comments set text=? where id=?",[text, id], (err, result)=>{
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        }
        else {
            
                res.json({
                    success:1,  
                    updatedComment: text
                })
            
        }
    })
})

postRouter.get("/getcomments/:id", authMiddleware, (req,res)=>{
    const id = req.params.id //post
    connection.query("select * from comments inner join users on comments.user_id = users.id where comments.post_id=?",[id], (err, result)=>{
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        }
        else {
            
                res.json({
                    success:1,  
                    result: result
                })
            
        }
    })
})
export default postRouter;