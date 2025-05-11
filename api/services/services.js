const db = require('./db');

async function getServices() {
    try {
        let result = await db.query('SELECT service_code, service_name, service_icon, service_tariff FROM services', []);
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = { getServices };