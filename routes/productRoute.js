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

});

router.post('/deleteproduct', (req, res) => {
    Product.findByIdAndDelete(req.body.productid, err => {
        if(err) {
            return res.status(400).json({ message: `Someting went wrong : ${err}`})
        } else {
            res.send('Product Delete Successfully')
        }
    })
});

router.post('/addproduct', (req, res) => {
    const { product } = req.body;

    const productModel = new Product({
        name : product.name , 
        price : product.price,
        description : product.description,
        countInStock : product.countInStock ,
        image : product.image ,
        category : product.category
    });

    productModel.save((err) => {
        if(err) {
            return res.status(400).json({ message: 'Something Went Wrong' })
        } else {
            res.send('Product Added Successfully')
        }
    })
});

router.post('/updateproduct', (req, res) => {
    Product.findByIdAndUpdate(req.body.productid, {
        name : req.body.updatedproduct.name,
        price : req.body.updatedproduct.price,
        category : req.body.updatedproduct.category,
        description : req.body.updatedproduct.description,
        countInStock : req.body.updatedproduct.countInStock,
        image : req.body.updatedproduct.image
    }, (err) => {
        if(err) {
            return res.status(400).json({ message: `Something went wrong ${err}` })
        } else {
            res.send('Product Updated Successfully')
        }
    })
})

module.exports = router;