const { Pathologies } = require('../models');

class PathologiesService {

	async getAll({params}, res) {
		if (!params || !params.area || !(params.area.length > 1 && params.area.length < 250) ) {
			return res.status(400).json({message: 'pathologies area is incorrect'});
		}

		const area = params.area[0].toUpperCase() + params.area.substring(1, params.area.length).toLowerCase();

		let items = null;

		try {
			items = await Pathologies.find({area}).sort('text');
		} catch(e){
			console.log('getAll:', e)
			return res.status(400).end();
		}

		return res.json(items);
	}

	// async getOne({params}, res) {
	// 	if (!params || !params.id ) {
	// 		return res.status(400).end();
	// 	}

	// 	let item = null;

	// 	try {
	// 		item = await Pathologies.findById(params.id);
	// 	} catch(e){
    //         console.log('getOne:', e)
	// 		return res.status(400).end();
	// 	}
		
	// 	if (!item) {
	// 		return res.status(404).end();
	// 	}

	// 	return res.json(item);
	// }


	async create({body}, res) {
		if (!body) {
			return res.status(400).end();
		}

		let item = null;

		try {
			item = await new Pathologies(body).save();
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
			await Pathologies.updateOne({_id: params.id}, { $set: body});
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
			await Pathologies.deleteOne({_id: params.id});
		} catch(e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = PathologiesService;