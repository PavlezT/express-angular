var express = require('express');
var router = express.Router();
const { ClinicService } = require('../services');

const service = new ClinicService();

router.get('/all/:territory?', service.getAll);
router.get('/:id', service.getOne);
router.post('/', service.create);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;
