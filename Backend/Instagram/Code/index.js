import express from "express";
import cors from "cors";

import authRouter from "./Routes/auth.js" 
import postRouter from "./Routes/posts.js"
import friendsRouter from "./Routes/friends.js"

const app=express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/friends", friendsRouter)
app.listen(8080, ()=>{
    console.log("Server is listening at port 8080");
})