import express from "express"
import path from "path"

const __dirname = path.resolve()
console.log(__dirname, "this is dir name");

const app = express()
const PORT = 8080


app.use((request, response, next) => {
    console.log(123);
    next()
})

app.use(express.static("public"))


// app.get("/", (request, response) => {
//     response.sendFile(path.resolve(__dirname, "public/index.html"))
// })

app.get("/about", (request, response) => {
    response.sendFile(path.resolve(__dirname, "public/about.html"))
})

app.use("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "public/404.html"))
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})