import express from 'express'
import "dotenv/config"

const app = express()
const PORT = process.env.PORT
console.log(process.env.SECET_KEY);

app.get("/", (request, response) => {
    try {
        someVariable
        response.status(200).send({
            message: "Hello Express JS",
            status: "success"
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            message:"Something went wrong",
            status:"error"
        })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})