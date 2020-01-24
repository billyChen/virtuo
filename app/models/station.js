const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		unique: true
	},
	cars: [{
		type: Schema.Types.ObjectId,
		ref: 'Car'
	}]
})


module.exports = mongoose.model('Station', stationSchema)