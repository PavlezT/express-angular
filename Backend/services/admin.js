const { Admin } = require('../models');
const config = require('../config');
const AuthHelper = require('../helpers/auth');

class AdminService {

	async login(req, res, next) {
		const {body} = req;
		if ( !body || !body.login || !body.password) {
			return res.status(400).end();
		}

		let admin = await Admin.findOne({login: body.login});

		if ( !admin ) {
			return res.status(404).end();
		}

		admin = admin.toJSON();

		if (! (await AuthHelper.checkUserPassword(body.password, admin.password))) {
			return res.status(404).end();
		}

		delete admin.password;
		
		const date =  new Date(Date.now() + config.SESSION.expiry);
		admin.sessionExpiryDate = date;
		req.session.user = admin;

		return res.json(admin);
	}

	async logout(req, res, next) {
		req.session.destroy();
		return res.status(200).end();
	}
}

module.exports = AdminService;