const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
	_id : {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	text: String,
	count: String,
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([
		{
			text: 'Patients treated worldwide',
			count: '70,000'
		},
		{
			text: 'Exceede customer expectations',
			count: '92%'
		},
		{
			text: 'Would refer a friend or family member',
			count: '95%'
		},
	]);
}

const MarketingItems = mongoose.model('MarketingItems', schema);

module.exports = MarketingItems;