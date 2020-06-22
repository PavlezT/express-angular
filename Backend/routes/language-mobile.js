var express = require('express');
var router = express.Router();
const { LanguagesMobileService } = require('../services');

const languagesService = new LanguagesMobileService();

router.get('/', languagesService.getAll);
router.get('/:locale', languagesService.getOne);
router.post('/', languagesService.create);
router.put('/:locale', languagesService.upload);
router.delete('/:locale', languagesService.delete);

module.exports = router;
