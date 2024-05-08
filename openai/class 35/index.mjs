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
                    flavor: {
                        type: "string",
                        description: "the flavor of pizza chicken , malai",
                    },
                },
                required: ["size", "flavor"],

            }
        }
    }
]

const openai = new OpenAI();

const getTime = () => new Date().toLocaleString()

const orderPizza = () => "123456"

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
                model: "gpt-3.5-turbo",
                messages: messages,
                tools: tools,
                tool_choice: "auto"
            })
            aiRes = completion2.choices[0].message.content
            // console.log(aiRes);
        }

        if (functionName === "orderPizza") {
            console.log(functionArug, "this is functionArug");
            const res = orderPizza()
            messages.push({
                role: "tool",
                content: res,
                tool_call_id: functionCallId
            })
            const completion2 = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
                tools: tools,
                tool_choice: "auto"
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