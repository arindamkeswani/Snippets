import jwt from 'jsonwebtoken'
import secret from '../secret.js';

function authMiddleware(req, res, next) {
    const authHeadder = req.headers['authorization'];
    const token = authHeadder && authHeadder.split(" ")[1];
    console.log(authHeadder);
    if (token == null) res.json({
        error: "Auth failed",
        success: 0
    })
    else {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                res.send({
                    success: 0,
                    error: "Auth failed.."
                })
            }
            else {
                next()
            }
        })
    }
}

export default authMiddleware