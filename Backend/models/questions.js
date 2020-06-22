const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questions = require('../initdb/questions');

const schema = Schema({
    _id: {
        // unique: true,
        auto: true,
        type: Schema.Types.ObjectId,
        alias: 'id'
    },
    name: String,
    label: String,
    locale: String,
    desc: String,
    instructions: String,
    sections: {
        type: Array
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret, opts) => {
            delete ret._id;
            return ret;
        }
    }
});

schema.statics.initData = function () {
    return this.insertMany(questions);
};

const Questions = mongoose.model('Questions', schema);
module.exports = Questions;