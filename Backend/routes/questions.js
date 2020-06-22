var express = require('express');
var router = express.Router();
const { QuestionsService } = require('../services');

const service = new QuestionsService();

router.get('/', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.create);
router.put('/:id', service.upload);
router.delete('/:id', service.delete);

module.exports = router;
