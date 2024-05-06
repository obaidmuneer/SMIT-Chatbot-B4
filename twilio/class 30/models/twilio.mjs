import mongoose from 'mongoose';

const { Schema, model } = mongoose

const twilioSchema = new Schema({
    phoneNo: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },

})

const TwilioModel = model("twilio", twilioSchema)
export default TwilioModel