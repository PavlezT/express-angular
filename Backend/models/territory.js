const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const activityStatusSchema = require('./activity-status').schema;

const schema = Schema({
	_id: {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	language: {
		type: String,
		required: false
	},
	unitSystem: {
		type: String,
		enum: ['imperial', 'metric'],
		required: true
	},
	isUK: Boolean,
	postcode: { type: Boolean, default: false},
	referrals: [String],
	paymentTypes: [String],
	insurers: [String],
	activityStatus: [ activityStatusSchema ],
	supportedPackages: [String],
	dropOutReasons: [String]
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

// schema.virtual('activityStatus').get(function () {
// 	return this.name.first + ' ' + this.name.last;
// });


const Territory = mongoose.model('Territories', schema);
module.exports = Territory;