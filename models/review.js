const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	userid: {
		type : mongoose.Schema.Types.ObjectId
	},
	name : {
		type: String,
		require: true
	},
	comment : {
		type: String,
	},
	rating : {
		type: Number,
		require: true
	},
}, {
	timestamps: true
})

module.exports = reviewSchema;