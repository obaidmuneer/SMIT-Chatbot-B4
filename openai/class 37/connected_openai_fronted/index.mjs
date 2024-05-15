import express from "express"
import "dotenv/config"
import cors from "cors"
import { chat } from "./helpers/utils.mjs"

const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors())

app.post("/chat", async (req, res) => {
    try {
        const body = req.body
        console.log(body);
        const msg = body.msg

        const response = await chat(msg)

        res.send({
            message: "success",
            data: {
                msg: response
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})