const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const language = require('../initdb/us-mobile.json');

const schema = Schema({
	_id : {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	locale: {type: String, lowercase: true, trim: true},
	name: String,
	body: Object,
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([
		{
			locale: 'us-us',
			name: 'English',
			body: language
			//{"DASHBOARD":{"TITLE":{"TITLE":"Welcome to Apos","SUB_TITLE":"What would you like to do ?"},"ACTIONS":{"CHECK_IN":"Check in patient","CANCEL":"Cancel apponintment","CHECK_OUT":"Check out patient","BROWSE":"Browse patients","CLINIC_ANALYTICS":"Clinic analytics"}}}
		}
	])
}

const Languages = mongoose.model('LanguagesMobile', schema);

module.exports = Languages;