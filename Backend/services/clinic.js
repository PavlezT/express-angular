const { Clinic } = require('../models');
const { User } = require('../models');

class ClinicService {

	async getAll({params}, res) {
        const territory = (params && params.territory) || null;
		let clinics = null;

		try {
			clinics = await Clinic.find(territory ? {territory} : {})
				.select('id name')
				.populate({ path:'territory', select:'id name'})
				.sort('name');
				// .sort({'territory.name' : -1});
		} catch(e){
			console.log('getAll:', e)
			return res.status(400).end();
		}

		return res.json(clinics);
	}

	async getOne({params}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		let clinic = null;

		try {
			clinic = await Clinic.findById(params.id).populate({ path:'territory', select:'id name'});
		} catch(e){
            console.log('getOne:', e)
			return res.status(400).end();
		}
		
		if (!clinic) {
			return res.status(404).end();
		}

		return res.json(clinic);
	}


	async create({body}, res) {
		if (!body) {
			return res.status(400).end();
		}

		let clinic = null;

		try {
			clinic = await new Clinic(body).save();
		} catch(e) {
            console.log('create:', e)
			return res.status(400).json(e);
		}

		return res.json(clinic);
	}


	async update({params, body}, res) {
		if (!params || !params.id ) {
			return res.status(400).end();
		}

		try {
			await Clinic.updateOne({_id: params.id}, { $set: body});
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
			const count = await User.countDocuments({'clinics.clinic': params.id});
			if (count) {
				return res.status(409).end();
			}
			await Clinic.deleteOne({_id: params.id});
		} catch(e) {
			return res.status(400).end();
		}

		return res.status(200).end();
	}
}

module.exports = ClinicService;