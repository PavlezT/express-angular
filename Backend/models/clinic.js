
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const statusTypes = {
//     values: [ 'ACTIVE', 'PENDING' ],
//     message: 'Status must be either of \'ACTIVE\', \'PENDING\''
// };
const schema = new Schema({
    _id : {
        // unique: true,
        auto: true,
        type: Schema.Types.ObjectId,
        alias: 'id'
    },
    name: { type: String, unique: true, required: true },
    country: { type: String, required: true },
    city: { type: String },
    street: { type: String },
    profile: {type: String, required: false, enum: ['compliance', 'requirements'], default: 'compliance'},
    // street: { type: String, enum: statusTypes, required: true, default: 'PENDING' }
    latitude: Number,
    longitude: Number,

    territory: { type: Schema.Types.ObjectId, ref: 'Territories' ,required: true }
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
        delete ret._id;
        return ret;
    }}
});

// schema.index({ email: 1 }, { unique: true });

// delete mongoose.connection.models.User;

module.exports = mongoose.model('Clinics', schema);