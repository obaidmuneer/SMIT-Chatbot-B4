import express from "express"

const app = express()
const PORT = 8080

app.use(express.static("public"))
// app.use(express.static("public", { index: false }))

app.get("/", (request, response) => {
    response.status(200).send({
        message: "Hello nodejs"
    })
});

app.listen(PORT, () => {
    console.log("server is running on " + PORT);
})
