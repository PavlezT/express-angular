const AWS = require('aws-sdk');
const { Territory } = require('../models');
const { Clinic } = require('../models');
const config = require('../config');

const s3 = new AWS.S3({
	accessKeyId: config.AWS.IAM_USER_KEY,
	secretAccessKey: config.AWS.IAM_USER_SECRET,
	signatureVersion: config.AWS.SIGNATURE_VERSION,
	region: config.AWS.REGION
});

class TerritoryService {

	async getAll(req, res) {
		let territories = null;

		try {
			territories = await Territory.find({}).select('id name').sort('name');
		} catch (e) {
			console.log('getAll:', e)
			return res.status(400).end();
		}
		return res.json(territories);
	}

	async getOne({params}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		let territory = null;

		try {
			territory = await Territory.findById(params.id);
		} catch (e) {
			console.log('getOne:', e)
			return res.status(400).end();
		}
		if (!territory) {
			return res.status(404).end();
		}

		return res.json(territory);
	}


	async create({body}, res) {
		if (!body) {
			return res.status(400).end();
		}		
		
		const params = {
			Bucket: config.AWS.BUCKET_NAME,
			ACL: 'private',
			Key: `CTS_${body.name}_Documents/testFile.txt`,
			Body: 'Test file'
		};

		let territory = null;

		try {
			await new Promise((res, rej) => s3.upload(params, (error) => { 
				if (error) {
					console.log('S3 error:', error);
					return rej({error: 'Could not create AWS S3 folder'})
				 }
				 return res();
			}));
			territory = await new Territory(body).save();
		} catch (e) {
			console.log('create:', e)
			return res.status(400).json(e);
		}
		return res.json(territory);
	}


	async update({params, body}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		try {
			await Territory.updateOne({_id: params.id}, {$set: body});
		} catch (e) {
			console.log('update:', e)
			return res.status(400).end();
		}

		return res.status(200).end();
	}


	async delete({params}, res) {
		if (!params || !params.id) {
			return res.status(400).end();
		}

		try {
			const count = await Clinic.countDocuments({territory: params.id});
			if (count) {
				return res.status(409).end();
			}

			await Territory.deleteOne({_id: params.id});
		} catch (e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = TerritoryService;