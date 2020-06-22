var express = require('express');
var router = express.Router();
const { TerritoryService } = require('../services');

const service = new TerritoryService();

router.get('/', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.create);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;
