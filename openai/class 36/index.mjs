import OpenAI from 'openai';
import "dotenv/config"
import inquirer from 'inquirer';

const messages = [
    {
        role: "system",
        content: `
        You are helpful AI assitant and call function(s) only if parameters can be gussed from user query other wise ask follow up question to fill parameters.
        * Ask one question at a time.
        * Give options with each question if available.
        `
    }
]

const tools = [
    {
        type: "function",
        function: {
            name: "getTime",
            description: "return current time"
        }
    },
    {
        type: "function",
        function: {
            name: "orderPizza",
            description: "place order of user and return order id",
            parameters: {
                type: "object",
                properties: {
                    size: {
                        type: "string",
                        description: "the size of pizza small - medium - large",
                    },
                    qty: {
                        type: "string",
                        description: "the quantity  of pizza 1 - 1000",
                    },
                    flavor: {
                        type: "string",
                        description: "the flavor of pizza chicken , malai",
                    },
                },
                required: ["size", "flavor", "qty"],

            }
        }
    },
    {
        type: "function",
        function: {
            name: "getWeather",
            description: "Get the current weather in a given location ",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The city and state ie karachi",
                    },
                },
                required: ["location"],

            }
        }
    },
    {
        type: "function",
        function: {
            name: "fallBack",
            description: "catch unhandled user query ",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "unhandled user query",
                    },
                },
                required: ["query"],

            }
        }
    },
]

const openai = new OpenAI();

const getTime = () => new Date().toLocaleString()

const sizes = ["small", "medium", "large"]

const orderPizza = (params) => {
    if (!params?.size) {
        return "missing required paramter 'size'"
    } else if (!sizes.includes(params?.size)) {
        return "invalid option 'extra large' valid options are small , medium ,large"
    } else if (!params?.flavor) {
        return "missing required paramter 'flavor' "
    } else if (!params?.qty) {
        return "missing required paramter 'qty'"
    }
    return "123456"
}

const getWeather = async (params) => {
    if (!params?.location) {
        return "missing required paramter 'location'"
    }
    let apiKey = '55ff5b9f1aa556e25d9767c01329b185'
    console.log(params);
    const city = params?.location
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const res = await fetch(url)
    const json = await res.json()
    console.log(json.main.temp);
    return `${json.main.temp}`

}


async function chat(user_query) {
    let aiRes = ""
    console.log(messages);
    messages.push({
        role: "user",
        content: user_query
    })

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        tools: tools,
        tool_choice: "auto"
    })
    messages.push(completion.choices[0].message)
    console.log(JSON.stringify(completion));
    console.log(completion.choices);
    // console.log(typeof completion.choices[0].message.content);
    const invokeFunction = completion.choices[0].finish_reason === "tool_calls"

    if (invokeFunction) {
        console.log("calling function");
        const functionName = completion.choices[0].message.tool_calls[0].function.name
        const functionArug = completion.choices[0].message.tool_calls[0].function.arguments
        const functionCallId = completion.choices[0].message.tool_calls[0].id
        if (functionName === "getTime") {
            const res = getTime()
            messages.push({
                role: "tool",
                content: res,
                tool_call_id: functionCallId
            })
            const completion2 = await openai.chat.completions.create({
                model: "gpt-4",
                messages: messages,

            })
            aiRes = completion2.choices[0].message.content
            // console.log(aiRes);
        }

        if (functionName === "orderPizza") {
            console.log(functionArug, "this is functionArug");
            const parsedJson = JSON.parse(functionArug)
            const res = orderPizza(parsedJson)
            messages.push({
                role: "tool",
                content: res,
                tool_call_id: functionCallId
            })
            const completion2 = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            })
            aiRes = completion2.choices[0].message.content
            // console.log(aiRes);
        }

        if (functionName === "getWeather") {
            console.log(functionArug, "this is functionArug");
            const parsedJson = JSON.parse(functionArug)
            const res = await getWeather(parsedJson)
            console.log(res);
            console.log(typeof res);
            messages.push({
                role: "tool",
                content: res,
                tool_call_id: functionCallId
            })
            const completion2 = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            })
            aiRes = completion2.choices[0].message.content
            // console.log(aiRes);
        }

    } else {
        aiRes = completion.choices[0].message.content
    }
    return aiRes
}

// chat("what is the time right now?")

const askMan = () => {
    const ask = (query) => {
        inquirer
            .prompt([
                {
                    name: 'query',
                    message: query || "I am an AI assitant how can I help you? to exit prompt enter 0 \n"
                }
            ])
            .then(async (answers) => {
                // console.log(answers.query);
                const res = await chat(answers.query)
                const ans = res

                if (answers.query != 0) {
                    ask(`${ans} \n `)
                }
            })
    }
    ask()
}
askMan()