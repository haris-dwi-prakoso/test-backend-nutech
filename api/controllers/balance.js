const BalanceService = require('../services/balance');

async function getBalance(req, res) {
    try {
        const { email } = req.token;
        let result = await BalanceService.getBalance(email);
        res.status(200).json({
            status: 0,
            message: "Get Balance berhasil",
            data: result
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function topup(req, res) {
    try {
        const { email } = req.token;
        const { top_up_amount } = req.body;
        if (typeof top_up_amount !== 'number' || top_up_amount < 0) res.status(400).json({
            status: 102,
            message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
            data: null
        });
        let result = await BalanceService.topup(email, top_up_amount);
        res.status(200).json({
            status: 0,
            message: "Top Up Balance berhasil",
            data: result
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

module.exports = { getBalance, topup }