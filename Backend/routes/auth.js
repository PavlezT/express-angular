var express = require('express');
var router = express.Router();
const { AdminService } = require('../services');

const adminService = new AdminService();

router.post('/login', adminService.login);
router.post('/logout', adminService.logout);

module.exports = router;
