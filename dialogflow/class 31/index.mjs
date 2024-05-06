import express from "express"
import "dotenv/config"
import cors from "cors"

const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors())

const getData = async (city) => {
    let apiKey = '55ff5b9f1aa556e25d9767c01329b185'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res = await fetch(url)
    const json = await res.json()
    // console.log(json.main.temp);
    return json.main.temp

}
// getData("karachi")

app.post("/webhook", async (req, res) => {
    try {
        const body = req.body
        // console.log(JSON.stringify(body));
        const parameters = body.queryResult.parameters
        const intent = body?.queryResult?.intent?.displayName
        let dialogflow_response;
        console.log(intent);

        if (intent === "weather") {
            const date = parameters.date.date_time
            const city = parameters.location.city
            console.log(date, city);
            const data = await getData(city)
            dialogflow_response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                `The weather right now in your city is ${data}`
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