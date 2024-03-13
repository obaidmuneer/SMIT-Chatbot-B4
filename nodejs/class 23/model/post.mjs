import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, required: false, default: 0 },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

const PostModel = mongoose.model("post", postSchema)
export default PostModel