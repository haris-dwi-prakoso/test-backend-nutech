const express = require('express');
const router = express.Router();
const BannersController = require('../controllers/banners');

router.get('/banner', BannersController.getBanners);

module.exports = router;