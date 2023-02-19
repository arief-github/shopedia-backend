const mongoose = require("mongoose");
const reviewSchema = require('./review');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    countInStock: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    reviews: [
    	reviewSchema
    ]
}, {
	timestamps: true
})

const Product = mongoose.model('products', productSchema);

module.exports = Product;
