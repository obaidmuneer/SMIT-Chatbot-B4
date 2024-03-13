import express from 'express'
import "dotenv/config"
import cors from "cors"
import todoRoutes from "./routes/todos.mjs"
import postRoutes from "./routes/post.mjs"
import connectDB from './db/main.mjs'

const app = express()
const PORT = process.env.PORT || 8080
connectDB()
app.use(express.json())
app.use(cors())


app.get("/", (request, response) => {
    try {

        response.status(200).send({
            message: "Hello Express JS",
            status: "success"
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message: "Something went wrong",
            status: "error"
        })
    }

})

app.use("/todos", todoRoutes)
app.use("/posts", postRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})