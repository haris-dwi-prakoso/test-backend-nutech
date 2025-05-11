const ServicesService = require('../services/services');

async function getServices(req, res) {
    try {
        let result = await ServicesService.getServices();
        res.status(200).json({
            status: 0,
            message: "Sukses",
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

module.exports = { getServices };