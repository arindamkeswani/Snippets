import express from "express"
import jwt from "jsonwebtoken";
import connection from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import secret from "../secret.js";

const postRouter = express.Router();


postRouter.get("/allPosts", authMiddleware, (req, res) => {
    connection.query("select fullname,email,profile_pic,video_url from posts p cross join users u on p.user_id = u.id", (err, result) => {
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        } else {
            if (result) {
                res.json({
                    result,
                    success: 1
                })
            } else {
                res.json({
                    success: 1,
                    error: "No Posts"
                })
            }
        }
    });
})

postRouter.get("/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    connection.query("select fullname,email,profile_pic,video_url from posts inner join users on users.id = posts.user_id where posts.id = ?", [id],
        (err, result) => {
            if (err) {
                res.json({
                    success: 0,
                    error: err.message
                })
            } else {
                if (result.length > 0) {
                    res.json({
                        result: result[0]
                    })
                } else {
                    res.json({
                        success: 0,
                        error: "Post not found or invalid post id."
                    })
                }
            }
        })
})

postRouter.get("/mypost/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    connection.query("select fullname,email,profile_pic,video_url from posts inner join users on users.id = posts.user_id where users.id = ?", [id],
        (err, result) => {
            if (err) {
                res.json({
                    success: 0,
                    error: err.message
                })
            } else {
                if (result.length > 0) {
                    res.json({
                        result: result
                    })
                } else {
                    res.json({
                        success: 0,
                        error: "User not found or invalid user id."
                    })
                }
            }
        })
})


postRouter.post('/dolike/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: "Auth failed.."
            })
        }
        else {
            connection.query("insert likes(user_id, post_id) values(?,?)", [user.id, id], (err, result) => {
                console.log(user.id);
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    res.json({
                        success: 1
                    })
                }
            })
        }
    })
})


postRouter.delete('/undolike/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: "Auth failed.."
            })
        }
        else {
            //getting user from token 
            connection.query("delete from likes where user_id=? and post_id=?", [user.id, id], (err, result) => {
                if (err) {
                    res.json({
                        success: 0,
                        error: err.message
                    })
                }
                else {
                    res.json({
                        success: 1
                    })
                }
            })
        }
    })
})

postRouter.get('/checklike/:id', authMiddleware, (req, res) => {
    const id = req.params.id; //post id
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: "Checklike process failed."
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
                    if (result.length > 0) {
                        res.json({ success: 1 })
                    }
                    else {
                        res.json({ success: 0 })
                    }
                }
            })
        }

    })
})

postRouter.get('/undolike/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    connection.query("select count(*) as count from likes where post_id=?", [id], (err, result) => {
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        }
        else {
            if (result.length > 0) {
                res.json({
                    result: result[0]
                })
            }
        }
    })
})

postRouter.get('/countlike/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    connection.query("select count(*) as count from likes where post_id =?", [id], (err, result) => {
        if (err) {
            res.json({
                success:0,
                error: err.message
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
export default postRouter