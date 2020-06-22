const { Languages } = require('../models');
const fs = require('fs');

class LanguagesService {

	async getAll(req, res) {
		let items = null;

		try {
			items = await Languages.find({}).select('locale name').sort('locale');
		} catch(e){
			console.log('getAll:', e)
			return res.status(400).end();
		}

		return res.json(items);
	}

	async getOne({params}, res) {
		if (!params || !params.locale ) {
			return res.status(400).end();
		}

		let item = null;

		try {
			item = await Languages.findOne({locale: params.locale});
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
		if (!body || !body.locale || !body.name) {
			return res.status(400).end();
		}

		let item = await Languages.findOne({locale: body.locale});

		try {
			if (!item)
				item = await new Languages(body).save();
			else {
				throw {message: 'This language (locale) is already exists'};
				// await Languages.updateOne({locale: body.locale}, {$set: body})
			}
		} catch(e) {
			return res.status(400).json(e);
		}
		item = item.toJSON();
		delete item.body;
		return res.json(item);
	}


	async upload(req, res) {
		const {params} = req;

		if (!params || !params.locale || !req.files || !req.files.language ) {
			return res.status(400).end();
		}


		return fs.readFile(req.files.language.file, { encoding: 'utf-8' }, async (err, data) => {
			if (err) {
				return res.status(400).end();
			}
			
			try {
				const body = JSON.parse(data);
				await Languages.updateOne({locale: params.locale}, { $set: {body}});
			} catch(e) {
					console.log('update:', e)
				return res.status(400).end();
			}

			return res.status(200).end();
		});
	}


	async delete({params}, res) {
		if (!params || !params.locale ) {
			return res.status(400).end();
		}

		try {
			await Languages.deleteOne({locale: params.locale});
		} catch(e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = LanguagesService;