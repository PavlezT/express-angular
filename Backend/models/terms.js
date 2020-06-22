const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const schema = Schema({
	_id: {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
    },
    locale: String,
	name: String,
	text: String,
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	const termsHtml = fs.readFileSync(__dirname + '/../initdb/terms.html', { encoding: 'utf-8'});

	return this.insertMany([
		{
            text: termsHtml,
            locale: 'us-us',
			name: 'Terms of use'
		}
	]);
}

const Terms = mongoose.model('Terms', schema);
module.exports = Terms;