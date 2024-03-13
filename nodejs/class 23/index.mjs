import connectDB from './db/main.mjs'
import Post from "./model/post.mjs"

// await connectDB()

const createPost = async () => {
    console.log("creating post");
    const post = new Post({
        author: "Obiad Muneer",
        content: "This is my first post",
        title: "This is title"
    })
    await post.save()
}
// createPost()

const readPost = async () => {
    // const data = await Post.find({})
    // const data = await Post.find({ author: "Obiad Muneer" })
    // const data = await Post.find({ _id: "65eede7c41db9238e25adcc4" })
    const data = await Post.findById({ _id: "65eede7c41db9238e25adcc5" })
    
    console.log(data);
}

const main = async () => {
    await connectDB()
    //  createPost()
    readPost()

}
main()
