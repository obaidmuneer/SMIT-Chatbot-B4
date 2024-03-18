import express from "express"
import mongoose from "mongoose"
import Post from "./models/post.mjs"
import "dotenv/config"
import cors from "cors"


const DB_URI = process.env.DB_URI
const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(DB_URI)

app.get("/post", async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send({
            data: posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

app.post("/post", async (req, res) => {
    try {
        const { author, title, content } = req.body
        if (!author || !title || !content) {
            throw new Error("missing required params")
        }

        const post = await Post.create({
            author: author,
            title: title,
            content: content
        })
        res.send({
            data: post
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

app.put("/post/:id", async (req, res) => {
    console.log("put api");
    try {
        const { author, title, content } = req.body
        const id = req.params.id
        if (!id || !author || !title || !content) {
            throw new Error("missing required params")
        }

        const post = await Post.findByIdAndUpdate(id, {
            author: author,
            title: title,
            content: content
        }, { new: true })
        res.send({
            data: post
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

app.delete("/post/:id", async (req, res) => {
    console.log("delete api");
    try {
        const id = req.params.id
        if (!id) {
            throw new Error("missing required params")
        }
        const post = await Post.findByIdAndDelete(id)
        res.send({
            data: []
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})


// ========== mongoose event =============
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
// ========== mongoose event =============


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})