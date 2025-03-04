/** @format */
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
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
        required: true,
        enum: ['delivery', 'product', 'service']
    },
    discount: {
        type: Number,
        min: 0
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active'
    },
    timesUsed: {
        type: Number,
        default: 0,
        min: 0
    },
    expiresAfter: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date
    }
});

let Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
