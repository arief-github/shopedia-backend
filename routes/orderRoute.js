const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51MkMHqASVo9ESzyS7kB7QgoeBiJANB0MVT07BpmGpYbHt4KJ0lJRmkOBqyqqwHUO2WqdDfEfqBF8g3Lf5Kj3xJ6c002TJHrSaU")

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
        res.send("Payment Successfull")
    } else {
        res.send("Payment Failed")
    }
})

module.exports = router;