const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
	_id : {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	name: String,
	session: String
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([
			{
				"name":"Did not attend",
				session: null
			},
			{
				"name":"Canceled",
				sesssion: null
			},
		{
			"name": "Review booked",
			session: "initial"
		  },
		  {
			"name": "Started treatment",
			session: "initial"
		  },
		  {
			"name": "Did not join",
			session: "initial"
		  },
		  {
			"name": "Unsuitable",
			session: "initial"
		  },
		  {
			"name": "Active",
			session: "followup"
		  },
		  {
			"name": "Self-managing",
			session: "followup"
		  },
		  {
			"name": "Stopped treatment",
			session: "followup"
		  },
		  {
			"name": "Dropped-out (returned device)",
			session: "followup"
		  },
		  {
			"name": "Within treatment package",
			session: "followup"
		  },
		  {
			"name": "Within maintenance package",
			session: "followup"
		  },
		  {
			"name": "New maintenance package",
			session: "followup"
		 } 
	])
}

const ActivityStatus = mongoose.model('ActivityStatus', schema);

module.exports = { ActivityStatus, schema};