import OpenAI from "openai";
import "dotenv/config"
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index("syalni")


const createEmbeddings = async (query) => {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
    });

    // console.log(embedding.data);
    return embedding
}
// createEmbeddings(data)


const smartRetrival = async (query) => {
    const openaiEmbeddingRes = await createEmbeddings(query)
    const embedding = openaiEmbeddingRes.data[0].embedding
    const queryResponse = await index.namespace("faq").query({
        topK: 3,
        vector: embedding,
        includeMetadata: true,
        includeValues: false
    });
    // // console.log(JSON.stringify(queryResponse, null, 2));
    const chunks = queryResponse.matches.map((data, i) => {
        return `chunks ${i + 1} : ${data.metadata.text}`
    })

    const formattedData = chunks.join("\n")
    // // console.log(formattedData);
    return formattedData
}
// smartRetrival("what is pakistan?")
const messages = []

const manageReleventData = (releventData) => {
    messages[0] = {
        role: "system",
        content: `
        You are helpful AI assitant. Give answer according to provided data mentioned in angle bracket if answer is not found politely say I don't know.


        <
        Provided Data:
        ${releventData}
        >
        `
    }
}

// manageReleventData("123")
// // // console.log(messages);

const chat = async (user_query) => {
    const releventData = await smartRetrival(user_query)
    manageReleventData(releventData)
    messages.push({
        role: "user",
        content: user_query
    })

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    })

    messages.push(completion.choices[0].message)
    const ai_res = completion.choices[0].message.content
    // console.log(ai_res);
    console.log(messages);

    return ai_res
}

// chat("when it was founded ?")


export default chat