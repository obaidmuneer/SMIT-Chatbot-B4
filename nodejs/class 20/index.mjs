import express from 'express'
import "dotenv/config"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 8080
console.log(process.env.SECET_KEY);

app.use(express.json())
app.use(cors())

const todos = [
    { name: "obaid" },
    { name: "shezad" },
    { name: "hammad" }
]

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

app.get("/todos", (request, response) => {
    try {
        response.status(200).send({
            status: "success",
            message: "data fetched successfully.",
            data: todos
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            status: "error",
            message: "Something went wrong."
        })
    }
})

app.post("/todos", (request, response) => {
    try {
        const body = request.body
        console.log(body, "this is body");
        console.log(body.name, "this is name");
        if (!body.name) {
            response.status(400).send({
                status: "error",
                message: "missing required params.",
            })
            // throw new Error("missing required params")
        }
        todos.push({ name: body.name })

        response.status(200).send({
            status: "success",
            message: "data added successfully.",
            data: todos
        })
    } catch (error) {
        console.log(error, "this is error");
        response.status(500).send({
            status: "error",
            message: error.message
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})