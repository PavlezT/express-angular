const { Surgery } = require('../models');

class SurgeryService {

	async getAll(req, res) {
		let items = null;

		try {
			items = await Surgery.find({}).sort('text');
		} catch(e){
			console.log('getAll:', e)
			return res.status(400).end();
		}

		return res.json(items);
	}

	async getOne({params}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		let item = null;

		try {
			item = await Surgery.findById(params.id);
		} catch(e){
            console.log('getOne:', e)
			return res.status(400).end();
		}
		
		if (!item) {
			return res.status(404).end();
		}

		return res.json(item);
	}


	async create({body}, res) {
		if (!body) {
			return res.status(400).end();
		}

		let item = null;

		try {
			item = await new Surgery(body).save();
		} catch(e) {
            console.log('create:', e)
			return res.status(400).json(e);
		}

		return res.json(item);
	}


	async update({params, body}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		try {
			await Surgery.updateOne({_id: params.id}, { $set: body});
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
			await Surgery.deleteOne({_id: params.id});
		} catch(e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = SurgeryService;