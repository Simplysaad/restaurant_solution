/** @format */

const express = require('express');
const router = express.Router();

const Product = require('../Models/product.js');
const Order = require('../Models/order.js');

router.get('/', async (req, res) => {
    try {
        let products = await Product.find({}, { name: 1, price: 1 });
        return res.json({ products });
    } catch (err) {}
});

//<--- Cart Routes --->
router.get('/cart', async (req, res) => {
    try {
        let cart = req.session.cart;
        return res.json({ cart });
    } catch (error) {
        console.error(error);
    }
});
router.post('/cart/:id', async (req, res) => {
    try {
        if (!req.session.cart) req.session.cart = [];
        let productId = req.params.id;
        let { quantity } = req.body;

        let bodyQuantity = Number(req.body.quantity);

        let currentProduct = await Product.findOne(
            { _id: productId },
            { name: 1, price: 1 }
        );
        let { name, price } = currentProduct;
        console.log(name, price);

        let cart = req.session.cart;
        let index = cart.findIndex(item => item.productId === productId);

        let newCartItem = {
            productId,
            name,
            quantity,
            price: price.toFixed(2)
        };
        if (index >= 0) {
            if (bodyQuantity) req.session.cart[index].quantity = bodyQuantity;
            else req.session.cart[index].quantity += 1;

            let subTotal = price * req.session.cart[index].quantity;

            console.log('subTotal', subTotal);
            req.session.cart[index].price = subTotal.toFixed(2);

            console.log(
                `item with id: ${productId} already exists so i added ${quantity}`
            );
        } else {
            req.session.cart.push(newCartItem);
            console.log(`added new item with id: ${productId}
            `);
        }
        return res.json({ cart });
    } catch (error) {
        console.error(error);
    }
});
router.delete('/cart/:id', async (req, res) => {
    try {
        let productId = req.params.id;
        let cart = req.session.cart;
        
        let currentProduct = await Product.findOne(
            { _id: productId },
            { name: 1, price: 1 }
        );
        let { name, price } = currentProduct;
        
        let index = cart.findIndex(item => item.productId === productId);
        if (index >= 0) {
            let currentItem = cart[index];

            if (currentItem.quantity > 1) {
                req.session.cart[index].quantity -= 1;
                let subTotal = price * req.session.cart[index].quantity
                
                req.session.cart[index].price = subTotal.toFixed(2);
                
                console.log(`The quantity is more than one so i reduced one`);
            } else if (currentItem.quantity <= 1) {
                if (currentItem.quantity < 0) {
                    console.error(`item with id: ${productId} is not in cart`);
                    return res.json({ cart });
                }
                req.session.cart.splice(index, 1);
                console.log(
                    `The quantity is one or less than one so i just deleted it`
                );
            }
            return res.json({ cart });
        } else {
            console.error(`item with id: ${productId} is not in cart`);
        }
    } catch (err) {
        console.error(err);
    }
});
module.exports = router;
