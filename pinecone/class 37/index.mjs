import { Pinecone } from '@pinecone-database/pinecone';
import "dotenv/config"
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const openai = new OpenAI()


const creatIndex = async () => {
    const index = await pc.createIndex({
        name: 'syalni',
        dimension: 1536, // Replace with your model dimensions
        metric: 'cosine', // Replace with your model metric
        spec: {
            serverless: {
                cloud: 'aws',
                region: 'us-east-1'
            }
        }
    });

    console.log(index);
}
// creatIndex()

const createEmbeddings = async (text) => {
    const embeddings = await openai.embeddings.create({
        input: text,
        model: "text-embedding-3-small"
    })
    console.log(embeddings.data[0].embedding);
    return embeddings.data[0].embedding
}
// createEmbeddings()

const upsertVector = async (text) => {
    const index = pc.index("syalni")
    const uuid = uuidv4()
    console.log(uuid);
    const embeddings = await createEmbeddings(text)

    //save data in default name space
    // await index.upsert([
    //     {
    //         id: uuid,
    //         values: embeddings,
    //         metadata: {
    //             text: text
    //         }
    //     }
    // ])

    try {
        await index.namespace("wahaj").upsert([
            {
                id: uuid,
                values: embeddings,
                metadata: {
                    text: text
                }
            },
            {
                id: uuid,
                values: embeddings,
                metadata: {
                    text: text
                }
            }
        ])
    } catch (error) {
        console.log(error);
    }
}
upsertVector("Hello Ilyas")