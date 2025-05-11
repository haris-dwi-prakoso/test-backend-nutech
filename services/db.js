const mysql = require('mysql2/promise');

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const [results] = await connection.execute(sql, params);

        return results;
    } catch (e) {
        throw e;
    }
}

module.exports = { query };