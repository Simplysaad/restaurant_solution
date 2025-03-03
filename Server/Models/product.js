/** @format */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    keywords: [
        {
            type: String,
            trim: true
        }
    ],
    category: {
        type: String,
        enum: ["protein", "swallow", "staples", "snacks"]
    },
    price: {
        type: Number,
        min: 0
    },
    image: {
        type: String
    },
    amountSold: {
        type: Number,
        default: 0,
        min: 0
    }
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;
