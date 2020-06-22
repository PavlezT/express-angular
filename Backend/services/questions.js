const { Questions } = require('../models');
const fs = require('fs');

class QuestionsService {

	async getAll(req, res) {
		let items = null;

		try {
			items = await Questions.find({}).select('id locale name label').sort('name');
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
			item = await Questions.findById(params.id);
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

		let item = await Questions.findOne(body);

		try {
			if (!item) {
				body.createdAt = new Date(Date.now());
				item = await new Questions(body).save();
			} else {
				throw {message: 'This question (locale) is already exists'};
				// await Questions.updateOne({locale: body.locale}, {$set: body})
			}
		} catch(e) {
			return res.status(400).json(e);
		}

		return res.json(item);
	}


	async upload(req, res) {
		const {params} = req;

		if (!params || !params.id || !req.files || !req.files.question ) {
			return res.status(400).end();
		}


		return fs.readFile(req.files.question.file, { encoding: 'utf-8' }, async (err, data) => {
			if (err) {
				return res.status(400).json({message: "file is not acceptible"});
			}
			
			try {
				const body = JSON.parse(data);
				body.updatedAt = new Date();

				delete body.name;
				delete body.locale;
				delete body.id;
				delete body.updatedAt;
				delete body.createdAt;

				await Questions.updateOne({_id: params.id}, { $set: body});
			} catch(e) {
					console.log('update:', e)
				return res.status(400).end();
			}

			return res.status(200).end();
		});
	}


	async delete({params}, res) {
		if (!params || !params.id) {
			return res.status(400).end();
		}

		try {
			const q = await Questions.findById(params.id);

			if (q && q.locale === 'us-us') {
				return res.status(400).json({message:'us-us locale is blocked to delete'})
			}

			await Questions.deleteOne({_id: params.id});
		} catch(e) {
			return res.status(400).json({error:e});
		}

		return res.status(200).end();
	}
}

module.exports = QuestionsService;