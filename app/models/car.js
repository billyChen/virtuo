const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		unique: true
	},
	available: {
		type: Boolean,
		required: true
	}
})

module.exports = mongoose.model('Car', carSchema)