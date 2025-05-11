const TransactionsService = require('../services/transactions');

async function createTransaction(req, res) {
    try {
        const { email } = req.token;
        const { service_code } = req.body;
        let result = await TransactionsService.createTransaction(email, service_code);
        if (result.valid) res.status(200).json({
            status: 0,
            message: result.message,
            data: result.data
        });
        else res.status(400).json({
            status: 102,
            message: result.message,
            data: result.data
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function getHistory(req, res) {
    try {
        const { email } = req.token;
        const { offset, limit } = req.query;
        let result = await TransactionsService.getHistory(email, limit, offset);
        if (result) res.status(200).json({
            status: 0,
            message: "Get History Berhasil",
            data: result
        });
        else res.status(400).json({
            status: 103,
            message: "User tidak ditemukan",
            data: null
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

module.exports = { createTransaction, getHistory }