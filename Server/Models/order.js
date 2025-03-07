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
        imageUrl: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    },
    { _id: false }
);
const ordersSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    deliveryType: {
        type: String,
        enum: ['pickup', 'delivery'],
        default: 'pickup'
    },
    
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'successful', 'abandoned', 'failed'],
        default: 'pending'
    },
    items: [itemSchema],
    coupons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons"
    }],
    totalCost: {
        type: Number,
        required: true
    },
    paymentMethod: String,

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
