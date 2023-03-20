const express = require('express');
const router = express.Router();
const Product = require("../models/product");

router.get("/getallproducts", (req, res) => {

    Product.find({}, (err, docs) => {

        if (!err) {
            return res.send(docs);
        } else {
            return res.status(400).json({ message: 'Something went wrong' });
        }

    })

});

router.post("/getproductbyid", (req, res) => {
    Product.find({ _id: req.body.productid }, (err, docs) => {

        if (!err) {
            res.send(docs[0])
        } else {
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
});

router.post("/addreview", async(req, res) => {
    const { review, productid, currentUser } = req.body;

    const product = await Product.findById({ _id: productid })

    const reviewModel = {
        name: currentUser.name,
        userid: currentUser._id,
        rating: review.rating,
        comment: review.comment
    }

    product.reviews.push(reviewModel);

    // current value review / reviews length exist inside array
    let rating = product.reviews.reduce((acc, val) => acc + val.rating, 0)/ product.reviews.length;
    product.rating = rating;

    product.save(err => {
        if(err) {
            return res.status(400).json({ message: 'Something Went Wrong' })
        } else {
            res.send('Review Submitted Successfully')
        }
    })

})

module.exports = router;