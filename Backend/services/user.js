const { User } = require('../models');
// const AuthHelper = require('../helpers/auth');
const AWS = require('aws-sdk');
const config = require('../config');

const cognito = new AWS.CognitoIdentityServiceProvider({
	accessKeyId: config.AWS.IAM_USER_KEY,
	secretAccessKey: config.AWS.IAM_USER_SECRET,
	signatureVersion: config.AWS.SIGNATURE_VERSION,
	region: config.AWS.REGION
});

class UserService {

	async getAll({params}, res) {
		const clinic = (params && params.clinic) || null;
		let users = null;

		try {
			users = await User.find( clinic ? { 'clinics.clinic': clinic } : {})
				.select('id firstname lastname status email clinics')
				.populate({ path:'clinics.clinic', select:'id name'})//, match: { _id: clinic},})
				.sort('lastname');
				// .sort({'territory.name' : -1});
		} catch(e){
			console.log('getAll:', e)
			return res.status(400).end();
		}

		return res.json(users);
	}

	async getOne({params}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		let user = null;

		try {
			user = await User.findById(params.id).populate({ path:'clinics.clinic', select:'id name'});
		} catch(e){
            console.log('getOne:', e)
			return res.status(400).end();
		}
		
		if (!user) {
			return res.status(404).end();
		}

		return res.json(user);
	}


	async create({body}, res) {
		if (!body) {
			return res.status(400).end();
		}

		let user = null;

		// body.password = await AuthHelper.hashPassword('qwerty123');
		const params = {
			UserPoolId: config.AWS.USER_POOL,
			Username: body.email,
			DesiredDeliveryMediums: ['EMAIL'],
			TemporaryPassword: 'Pa$$w0rd',
			// MessageAction: 'RESEND',
			UserAttributes: [
				{
					Name: 'email',
					Value: body.email
				},
				{
					Name: 'name',
					Value: body.firstname + ' ' + body.lastname
				},
				{
					Name: 'phone_number',
					Value: body.phonenumber//'+3806777096'+ Math.round(Math.random() * 100)
				},
				{
					Name:'custom:firstname',
					Value: body.firstname
				}
			]
		}

		const mfaParams = {
			SMSMfaSettings: { 
				Enabled: true,
				PreferredMfa: true
			 },
			// SoftwareTokenMfaSettings: { 
			// 	Enabled: true,
			// 	PreferredMfa: false
			// },
			UserPoolId: config.AWS.USER_POOL,
			Username: body.email,
		}

		try {
			const userPool = await new Promise((res, rej) => cognito.adminCreateUser(params, (error, data) => {
				if (error) {
					console.log('Cognito error:', error);
					return rej({message:'Error adding user to Cognito'})
				}
				return res(data);
			}));

			await new Promise((res, rej) => cognito.adminSetUserMFAPreference(mfaParams, (error, data) => {
				if (error) {
					console.log('Congito set MFA error:', error);
					return rej({message: 'Error updating user in Cognito'})
				}
				return res(data);
			}))

			body.externalId = userPool.User.Username;
			user = await new User(body).save();
		} catch(e) {
            console.log('create:', e)
			return res.status(400).json(e);
		}

		return res.json(user);
	}


	async update({params, body}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		// body.password = await AuthHelper.hashPassword('qwerty123');

		try {
			await User.updateOne({_id: params.id}, { $set: body});
		} catch(e) {
            console.log('update:', e)
			return res.status(400).end();
		}

		return res.status(200).end();
	}


	async delete({params}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		try {
			await User.deleteOne({_id: params.id});
		} catch(e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = UserService;