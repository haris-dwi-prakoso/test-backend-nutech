const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const BalanceController = require('../controllers/balance');

router.get('/balance', auth, BalanceController.getBalance);
router.post('/topup', auth, BalanceController.topup);

module.exports = router;