const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51MkMHqASVo9ESzyS7kB7QgoeBiJANB0MVT07BpmGpYbHt4KJ0lJRmkOBqyqqwHUO2WqdDfEfqBF8g3Lf5Kj3xJ6c002TJHrSaU")
const Order = require('../models/order');

router.post("/placeorder", async(req, res) => {
    const { token, cartItems, currentUser, subtotal } = req.body;

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    });

    const payment = await stripe.charges.create({
        amount: subtotal*100,
        currency: "USD",
        customer: customer.id,
        receipt_email: token.email
    }, {
        idempotencyKey: uuidv4()
    });

    if(payment) {
        const order = new Order({
            userid: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            orderItems: cartItems,
            shippingAddress : {
                address: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                postalCode: token.card.address_zip 
            },
            orderAmount: subtotal,
            transactionId: payment.source.id,
            isDelivered: false
        });

        order.save(err => {
            if(err) {
                return res.status(400).json({ message: 'Something went wrong' })
            } else {
                res.send('Order Placed Successfully')
            }
        })

    } else {
        res.status(400).json({message:"Payment Failed"})
    }
})

module.exports = router;