const Admin = require('./admin');
const Territory = require('./territory');
const { ActivityStatus } = require('./activity-status');
const Clinic = require('./clinic');
const User = require('./user');
const Pathologies = require('./pathologies');
const MarketingItems = require('./marketing-items');
const Surgery = require('./surgery');
const Languages = require('./language');
const LanguagesMobile = require('./language-mobile');
const Treatment = require('./treatment');
const Terms = require('./terms');
const Questions = require('./questions');

module.exports = {
	Admin,
	Territory,
	ActivityStatus,
	Clinic,
	User,
	Pathologies,
	MarketingItems,
	Surgery,
	Languages,
	Treatment,
	LanguagesMobile,
	Terms,
	Questions
};