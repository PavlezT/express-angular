const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeeksSchema = Schema({
    title: String,
    frequency: String,
    indoor: Number,
    outdoor: Number,
});

WeeksSchema.statics.initData = function(){
    return Promise.resolve(true);
}

const schema = Schema({
	_id : {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
    },
    type: String,
    customized: Boolean,
    weeks: [WeeksSchema]
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([
        {"customized":false,"type":"Treatment plan 1 – severe patients","weeks":[
            {"frequency":"Alternate day","title":"Week 1","indoor":15,"outdoor": 0,"addition":"overall WB time 20%"},
            {"frequency":"Alternate day","title":"Week 2","indoor":20,"outdoor": 0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 3","indoor":15,"outdoor": 0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 4","indoor":20,"outdoor":0,"addition":"overall WB time 20%"}]
        }
        ,{"customized":false,"type":"Treatment plan 2 – moderate-severe patients","weeks":[
            {"frequency":"Alternate day","title":"Week 1","indoor":20,"outdoor": 0,"addition":"overall WB time 20%"},
            {"frequency":"Alternate day","title":"Week 2","indoor":30,"outdoor": 0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 3","indoor":20,"outdoor":0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 4","indoor":30,"outdoor":0,"addition":"overall WB time 20%"}]
        }
        ,{"customized":false,"type":"Treatment plan 3 – moderate patients","weeks":[
            {"frequency":"Every day","title":"Week 1","indoor":30, "outdoor":0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 2","indoor":40, "outdoor":0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 3","indoor":50, "outdoor":0,"addition":"overall WB time 20%"},
            {"frequency":"Every day","title":"Week 4","indoor":60, "outdoor":0,"addition":"overall WB time 20%"}]
        }
        ,{"customized":false,"type":"Treatment plan 4 – mild patients","weeks":[
            {"frequency":"Every day","title":"Week 1","indoor":45,"outdoor":0,"addition":"overall WB time 30%"},
            {"frequency":"Every day","title":"Week 2","indoor":60,"outdoor":0,"addition":"overall WB time 30%"},
            {"frequency":"Every day","title":"Week 3","indoor":75,"outdoor":0,"addition":"overall WB time 30%"},
            {"frequency":"Every day","title":"Week 4","indoor":90,"outdoor":0,"addition":"overall WB time 30%"}]
        }
        ,{"customized":false,"type":"Treatment plan 5 – very mild patients","weeks":[
            {"frequency":"Every day","title":"Week 1","indoor":60, "outdoor":0,"addition":"overall WB time 50%"},
            {"frequency":"Every day","title":"Week 2","indoor":75, "outdoor":0,"addition":"overall WB time 50%"},
            {"frequency":"Every day","title":"Week 3","indoor":90, "outdoor":0,"addition":"overall WB time 50%"},
            {"frequency":"Every day","title":"Week 4","indoor":120,"outdoor":0,"addition":"overall WB time 50%"}]
        }
    ]);
}

module.exports = mongoose.model('Treatment', schema);