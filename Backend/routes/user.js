var express = require('express');
var router = express.Router();
const { UserService } = require('../services');

const service = new UserService();

router.get('/all/:clinic?', service.getAll);
// router.get('/noclinic', service.getAllNoClinic);

router.get('/:id', service.getOne);
router.post('/', service.create);
router.put('/:id', service.update);
router.delete('/:id', service.delete);

module.exports = router;
