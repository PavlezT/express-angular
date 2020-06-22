const mongoose = require('mongoose');
const models = require('./models');
const fs = require('fs');
const {DB:{user, password, url, ssl}, name} = require('./config');

let uri = `mongodb+srv://${user && password ? user + ':' + password + '@' : ''}${url}?retryWrites=true`;

var ca = [fs.readFileSync("./bin/rds-combined-ca-bundle.pem")];

let connection = null;

async function connect() {
	let options = {useNewUrlParser: true, useCreateIndex: true};

	if (name != 'development') {
		uri = uri.replace('mongodb+srv', 'mongodb');
		if (ssl) {
			uri+='&ssl=true&replicaSet=rs0';
			options.sslValidate = true;
			options.sslCA = ca;
		}
	}

	connection = await mongoose.connect(uri, options);

	await checkInitData();

	return connection;
}

function stop() {
	if (connection)
		return connection.close();
}

async function checkInitData() {
	const statuses = await models.ActivityStatus.find();

	if (!statuses || statuses.length === 0) {
		console.log("INSERTING DB initial data: ActivityStatus");
		await models.ActivityStatus.initData();
		console.log("INSERTING DB initial data: Admin");
		await models.Admin.initData();
		console.log("INSERTING DB initial data: MarketingItems");
		await models.MarketingItems.initData();
		console.log("INSERTING DB initial data: RecommendedSurgery");
		await models.Surgery.initData();
		console.log("INSERTING DB initial data: Languages");
		await models.Languages.initData();
		console.log("INSERTING DB initial data: Languages Mobile");
		await models.LanguagesMobile.initData();
		console.log("INSERTING DB initial data: Treatment");
		await models.Treatment.initData();
		console.log("INSERTING DB initial data: Pathologies");
		await models.Pathologies.initData();
		console.log("INSERTING DB initial data: Terms");
		await models.Terms.initData();
		console.log("INSERTING DB initial data: Questions");
		await models.Questions.initData();

		console.log("INSERTING DB initial data: DONE");
	}
}

module.exports = {
	connect,
	stop
}
