const bcrypt = require('bcrypt');
const config  = require('../config');

function checkAuth(req, res, next) {
	if (req.session && req.session.user && req.session.user.sessionExpiryDate) {
		var expirationTime = new Date(req.session.user.sessionExpiryDate);

		if (new Date(Date.now()) > expirationTime) {
			return res.sendStatus(403);
		} else {
			next();
		}
	} else {
		return res.sendStatus(403);
	}
}

async function checkUserPassword(password, passwordHash) {
	const match = await bcrypt.compare(password, passwordHash);
	return match;
}

async function hashPassword(password) {
	const salt = config.SESSION.salt;
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

module.exports = {
	checkAuth,
	checkUserPassword,
	hashPassword,
}