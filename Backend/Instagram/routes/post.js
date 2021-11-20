import express from "express"
import connection from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";


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

export default postRouter