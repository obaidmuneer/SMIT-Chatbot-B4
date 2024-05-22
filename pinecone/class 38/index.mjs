import OpenAI from "openai";
import "dotenv/config"
import { v4 as uuidv4 } from "uuid"
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index("syalni")



const data = [
    "Saylani Welfare International Trust is a non-government organization (NGO) focusing primarily on feeding the poor and homeless. It was established in May 1999 and is headquartered at Bahdurabad, Karachi, Pakistan.[1]",
    "It was founded and headed by spiritual and religious scholar Maulana Bashir Farooq Qadri.[2][3] With an estimated monthly expenditure of Pakistani Rupees above 30 million, Saylani Trust provides food twice a day to more than 30,000 poor people through its 100 centers (generally known as Dastar-Khawan), most of them are serving in Karachi.[4][5] The organization distributed CNG rickshaws among the jobless citizens of Karachi in April 2011 with the help of members of the Karachi business community.[6]",
    `Medical institutions of Saylani
    With its offices in Nottingham, UK, Saylani Welfare raises funds, as well as raising awareness of a range of charity projects. Services by Saylani (NGO) are provided free of cost. It offers the following medical services at the following facilities:[1]
    
    (i) Saylani Chest Care Center, provides services to patients suffering from Tuberculosis
    (ii) Saylani Diabetic Center, giving services to diabetic patients with facilities for the treatment of Hepatitis "C"`,
    `Charitable initiatives
    Saylani, since its inception, has worked on both providing needed economic and nutritional help to the needy in distress as well as providing means for able-bodied persons to earn a living through innovative solutions to "tackle the root causes and effects of poverty of Pakistani citizens." This ranges anywhere from programs similar to those provided by Social Security in Western nations to doing area to area and neighborhood to neighborhood searches of the needy and providing relief.[7] Notable among these programs are:
    Roti Bank, Economic empowerment , Aid to Syrian and Rohingya refugees , COVID-19 crisis`,
    `
    Founded	May 1999
    Founder	Maulana Bashir Farooq Qadri
    Focus	Emergency services, food to homeless, education, healthcare, ambulance services
    Location	
    Karachi, Sindh, Pakistan
    Area served	Social Welfare, Humanitarianism
    Method	Donations and grants
    Employees	20000
    Website	saylaniwelfare.com`
]


const createEmbeddings = async (query) => {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
    });

    console.log(embedding.data);
    return embedding
}
// createEmbeddings(data)

const upsertVector = async (text) => {
    // const uuid = uuidv4()
    // console.log(uuid);
    const embeddings = await createEmbeddings(data)
    const formattedData = embeddings.data.map((e, i) => {
        const uuid = uuidv4()
        const openAIIndex = e.index

        return {
            id: uuid,
            values: e.embedding,
            metadata: {
                text: data[i]
            }
        }
    })
    console.log(formattedData);

    try {
        await index.namespace("faq").upsert(formattedData)
    } catch (error) {
        console.log(error);
    }
}

// upsertVector()

const queryVector = async (query) => {
    const openaiEmbeddingRes = await createEmbeddings(query)
    const embedding = openaiEmbeddingRes.data[0].embedding
    const queryResponse = await index.namespace("faq").query({
        topK: 3,
        vector: embedding,
        includeMetadata: true
    });
    console.log(JSON.stringify(queryResponse, null, 2));
}
queryVector("what is pakistan?")