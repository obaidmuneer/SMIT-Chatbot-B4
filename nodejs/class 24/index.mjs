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
    post.author = "Asad"
    await post.save()
    // const post = await Post.create({
    //     author: "Obiad Muneer",
    //     content: "This is my first post",
    //     title: "This is title"
    // })

}
// createPost()

const readPost = async () => {
    // const data = await Post.find({})
    // const data = await Post.find({ author: "Obiad Muneer" })
    // const data = await Post.find({ _id: "65eede7c41db9238e25adcc4" })
    const data = await Post.findById({ _id: "65eede7c41db9238e25adcc5" })

    console.log(data);
}

const updatePost = async () => {
    const post = await Post.findByIdAndUpdate("65eede7c41db9238e25adcc4", {
        author: 'hussan'
    },{new:true})
    console.log(post);
}

const deletePost = async() =>{
    // const post = await Post.findByIdAndDelete("65f13acd2dfec6e2869dfc07")
    const post = await Post.deleteMany({})
    console.log(post);
}

const main = async () => {
    await connectDB()
     createPost()
    // readPost()
    // updatePost()
    // deletePost()

}
// main()
