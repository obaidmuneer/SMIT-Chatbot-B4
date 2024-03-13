import express from "express"
import Post from "../model/post.mjs"

const router = express.Router()

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router