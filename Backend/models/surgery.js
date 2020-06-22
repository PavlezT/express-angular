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
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([
		{
			text:'Arthroscopy'
		},
		{
			text:'ACL reconstruction'
		},
		{
			text:'Unicompartmental knee replacement'
		},
		{
			text:'Knee replacement'
		},
		{
			text:'Hip replacement'
		},
		{
			text:'TKR revision'
		},
		{
			text:'THR revision'
		},
		{
			text:'Spine surgery'
		}
	])
}

const Surgery = mongoose.model('RecommendedSurgery', schema);

module.exports = Surgery;