
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserToClinic = new Schema({
	role: { type: String, enum: ['receptionist', 'manager', 'atc']},
	clinic: { type: Schema.Types.ObjectId, ref: 'Clinics', required: true }
})

const schema = new Schema({
    _id : {
        // unique: true,
        auto: true,
        type: Schema.Types.ObjectId,
        alias: 'id'
    },
    externalId: {type: String, required: false},// required: true
	//  dateBirth: {type: Date, required: false}, // required: true
	 status: {type: String, enum: ['pending','validated','active'], default: 'pending'},

	 firstname: { type: String, required: true },
	 lastname: { type: String, required: true },
    email: { type: String, unique: false, required: true},
    phonenumber: { type: String, unique: true, required: true},
    // password: {type: String },
    clinics: [UserToClinic],

}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
        delete ret._id;
        return ret;
    }}
});

module.exports = mongoose.model('Users', schema);