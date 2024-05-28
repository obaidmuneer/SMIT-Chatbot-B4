import express from "express"
import "dotenv/config"
import cors from "cors"
import chat from "./utils/index.mjs"

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("ok")
})

app.post("/webhook", async (req, res) => {
    try {
        const body = req.body
        // console.log(JSON.stringify(body, null, 2));
        const parameters = body.queryResult.parameters
        const intent = body?.queryResult?.intent?.displayName
        const session = body?.session
        const context = body?.queryResult?.outputContexts // [] // find
        const query = body.queryResult.queryText
        console.log(query, "query");
        console.log(intent, "intent");
        console.log(parameters, "parameters");


        let dialogflow_response;

        if (intent === "Default Fallback Intent") {
            const ai_res = await chat(query)
            dialogflow_response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                ai_res
                            ]
                        }
                    }
                ]
            }

        }

        res.send(dialogflow_response)
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