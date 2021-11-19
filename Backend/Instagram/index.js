import express, { application } from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"
import postRouter from "./routes/post.js"

const app = express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/test", (req, res) => {
    res.json({
        success: 1
    })
})


app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)

app.listen(8080, () => {
    console.log("server is running on the port 8080");
})



