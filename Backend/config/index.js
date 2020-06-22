const development = require('./development.json');
const test = require('./test.json');
const production = require('./production.json');

const DEFAULT = 'development';

const configs = {
	development,
	test,
	production
};

module.exports = {
	...configs[process.env.NODE_ENV || DEFAULT],
	name: process.env.NODE_ENV || DEFAULT,
	swagger: process.env.SWAGGER || false
};
