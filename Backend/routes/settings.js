var express = require('express');
var router = express.Router();
const { PathologiesService, MarketingItemsService, SurgeryService } = require('../services');

const pathologiesService = new PathologiesService();
const marketingItemsService = new MarketingItemsService();
const surgeryService = new SurgeryService();

// router.get('/pathologies/all', pathologiesService.getAll);
router.get('/pathologies/:area', pathologiesService.getAll);
router.post('/pathologies/', pathologiesService.create);
router.put('/pathologies/:id', pathologiesService.update);
router.delete('/pathologies/:id', pathologiesService.delete);

router.get('/marketingitems/all', marketingItemsService.getAll);
router.get('/marketingitems/:id', marketingItemsService.getOne);
router.post('/marketingitems/', marketingItemsService.create);
router.put('/marketingitems/:id', marketingItemsService.update);
router.delete('/marketingitems/:id', marketingItemsService.delete);

router.get('/surgery/all', surgeryService.getAll);
router.get('/surgery/:id', surgeryService.getOne);
router.post('/surgery/', surgeryService.create);
router.put('/surgery/:id', surgeryService.update);
router.delete('/surgery/:id', surgeryService.delete);

module.exports = router;
