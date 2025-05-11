const db = require('./db');

async function getBanners() {
    try {
        let result = await db.query('SELECT banner_name, banner_image, description FROM banners', []);
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = { getBanners };