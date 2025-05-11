const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services');

router.get('/services', ServicesController.getServices);

module.exports = router;