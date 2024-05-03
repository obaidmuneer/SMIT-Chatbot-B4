import express from "express"
import "dotenv/config"
import cors from "cors"

const PORT = process.env.PORT || 8080

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
        console.log(JSON.stringify(body));
        const parameters = body.queryResult.parameters
        const intent = body?.queryResult?.intent?.displayName
        const session = body?.session
        const context = body?.queryResult?.outputContexts // [] // find


        let dialogflow_response;
        console.log(intent);
        console.log(parameters);

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

        } else if (intent === "order") {
            dialogflow_response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                `Do you want to proceed your order ? yes/no`
                            ]
                        }
                    }
                ],
                "outputContexts": [
                    {
                        "name": `${session}/contexts/order-yes`,
                        "lifespanCount": 2,
                        "parameters": {
                            qty: parameters.qty,
                            size: parameters.size,
                            flavor: parameters.flavor,
                            name: "obaid"
                        }
                    },
                    {
                        "name": `${session}/contexts/order-no`,
                        "lifespanCount": 2,
                    }
                ]
            }
        } else if (intent === "order - yes") {

            const order_yes_context = context.find(c => {
                return c.name = `${session}/contexts/order-yes`
            })

            console.log(order_yes_context);
            const qty = order_yes_context.parameters.qty
            const size = order_yes_context.parameters.size
            const flavor = order_yes_context.parameters.flavor

            dialogflow_response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                `Your ${qty} ${size} ${flavor} pizza has been ordered`
                            ]
                        }
                    }
                ],
                "outputContexts": [
                    {
                        "name": `${session}/contexts/order-yes`,
                        "lifespanCount": 0,
                    },
                    {
                        "name": `${session}/contexts/order-no`,
                        "lifespanCount": 0,
                    }
                ]
            }
        }else if (intent === "order - no") {


            dialogflow_response = {
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [
                                `Your order has been cancelled.`
                            ]
                        }
                    }
                ],
                "outputContexts": [
                    {
                        "name": `${session}/contexts/order-yes`,
                        "lifespanCount": 0,
                    },
                    {
                        "name": `${session}/contexts/order-no`,
                        "lifespanCount": 0,
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