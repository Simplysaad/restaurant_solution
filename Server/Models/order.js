/** @format */

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {_id: false});
const ordersSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    deliveryType: {
        type: String,
        required: true,
        enum: ["pickup", "delivery"],
        default: "pickup"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "successful", "abandoned", "failed"],
        default: "pending"
    },
    items: [itemSchema],
    totalCost: {
        type: Number,
        required: true
    },
    paymentMethod: String,
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

let Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
