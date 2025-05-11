const BannersService = require('../services/banners');

async function getBanners(req, res) {
    try {
        let result = await BannersService.getBanners();
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

module.exports = { getBanners };