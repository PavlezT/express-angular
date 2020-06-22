var express = require('express');
var router = express.Router();
const { ActivityStatus } = require('../models');

router.get('/', async (req, res) => {
    return res.json(await ActivityStatus.find({}));
});

module.exports = router;
