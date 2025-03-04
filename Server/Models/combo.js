/** @format */

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        price: {
            type: Number,
            required: true
        },
        discount: Number,
        quantity: {
            type: Number,
            default: 1
        }
    },
    { _id: false }
);
const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comboType: {
        type: String,
        enum: ['personal', 'active', 'inactive', 'archive'],
        default: 'personal'
    },
    keywords: [String],
    imageUrl: {
        type: String
    },
    items: [itemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

let Order = mongoose.model('Order', ordersSchema);
module.exports = Order;
