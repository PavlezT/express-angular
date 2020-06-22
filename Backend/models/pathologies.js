const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pathologiesList = require('../initdb/pathologies-list');

const schema = Schema({
	_id : {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	area: {type: String, required: true, enum: [
		// new list
		'Knee', 'Hip', 'Foot & ankle', 'Neurological condition', 'Pediatric', 'Lower back', 'Upper back', 'Other',
		// old list
		'Ankle', 'Adult', 'Lumbar spine', 'Foot', 'Back'
	]},
	text: {type: String, required: true},
	side: {type: Boolean, dafault: false},
	effects: {type: Array, default: ["Left", "Right", "Bilateral"]}
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany(pathologiesList);
}

const Pathologies = mongoose.model('Pathologies', schema);

module.exports = Pathologies;