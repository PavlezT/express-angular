const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
	_id: {
		// unique: true,
		auto: true,
		type: Schema.Types.ObjectId,
        alias: 'id'
	},
	name: String,
	login: String,
	password: String,
}, { timestamps: true, versionKey: false, toJSON: {virtuals: true,  versionKey: false, transform: (doc,ret,opts) => {
		delete ret._id;
		return ret;
	}}
});

schema.statics.initData = function(){
	return this.insertMany([{
		name: "Admin",
		login: "admin",
		password: "$2b$08$j.hh7XJkhDOh.3Bx6UTL6efJ51Yl6FzwAmmx39nCKItXB5TSQv7Iu"
	}])
}

const Admin = mongoose.model('Admins', schema);


// userSchema.methods = {
//     /**
//      * Checks user password
//      * @param {String} candidatePassword candidate password
//      * @returns {Promise<Boolean>} promise which will be resolved when password compared
//      */
//     isValidPassword: async function (candidatePassword) {
//         if (!candidatePassword) {
//             return false;
//         }
//         if (!this.passwordHash) {
//             return false;
//         }
//         return await bcrypt.compare(candidatePassword, this.passwordHash);
//     },

//     /**
//      * Sets user password
//      * @param {String} password password to set
//      * @returns {Promise<>} promise which will be resolved when password set
//      */
//     setPassword: async function (password) {
//         if (password) {
//             this.passwordHash = await bcrypt.hash(password, config.saltRounds);
//         } else {
//             this.passwordHash = undefined;
//         }
//         return this.save();
//     },

//     /**
//      * Updates user object
//      * @param {String} userObject user object
//      * @returns {Promise<>} promise which will be resolved when user updated
//      */
//     updateMethod: async function (userObject) {
//         this.name = userObject.name;
//         this.status = 'ACTIVE';

//         return await this.save();
//     }
// };


module.exports = Admin;