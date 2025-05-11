const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const TransactionsController = require('../controllers/transactions');

router.post('/transaction', auth, TransactionsController.createTransaction);
router.get('/transaction/history', auth, TransactionsController.getHistory);

module.exports = router;