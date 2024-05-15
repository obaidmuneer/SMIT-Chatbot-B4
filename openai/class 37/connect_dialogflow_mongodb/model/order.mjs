import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    qty: { type: Number, required: true },
    size: { type: String, required: true },
    flavour: { type: String, required: true },
    status: { type: String, required: true, default: "pending" }
})

const orderModel = mongoose.model("order", orderSchema)
export {
    orderModel
}