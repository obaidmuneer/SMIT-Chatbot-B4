import express from "express"
import mongoose from "mongoose"
import Twilio from "./models/twilio.mjs"
import "dotenv/config"
import cors from "cors"

const DB_URI = process.env.DB_URI
const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(DB_URI)

app.get("/", async (req, res) => {
    try {

        res.send({
            message: "server is running"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

// const post = async () => {
//     await Twilio.create({
//         phoneNo: "+923133853852",
//         name: "Obaid"
//     })
// }
// post()
app.get("/twilio", async (req, res) => {
    try {
        console.log("get api triggered");
        // const posts = await Post.find({})
        const data = {
            name: "Obaid"
        }
        res.send({
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})


app.post("/twilio", async (req, res) => {
    try {
        const body = req.body
        console.log(body, "this is body");
        // const posts = await Post.find({})
        const data = await Twilio.findOne({
            phoneNo: body.phoneNo
        })
        console.log(data);
       
        res.send({
            data: data.name
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})


// ========== mongoose event =============
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
// ========== mongoose event =============


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})