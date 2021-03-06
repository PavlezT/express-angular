var express = require('express');
var router = express.Router();
const { LanguagesService } = require('../services');

const languagesService = new LanguagesService();

router.get('/', languagesService.getAll);
router.get('/:locale', languagesService.getOne);
router.post('/', languagesService.create);
router.put('/:locale', languagesService.upload);
router.delete('/:locale', languagesService.delete);

module.exports = router;
