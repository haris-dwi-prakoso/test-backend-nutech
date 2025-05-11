const db = require('./db');
const { generateInvoiceNo } = require('../helper');
const moment = require('moment');

async function getBalance(email) {
    try {
        let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user) {
            let balance = await db.query('SELECT * FROM user_balances WHERE user_id = ?', [user[0].id]);
            return { balance: balance[0].balance };
        }
        else return null;
    } catch (e) {
        throw e;
    }
}

async function topup(email, amount) {
    try {
        let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user) {
            await db.query('UPDATE user_balances SET balance = balance + ? WHERE user_id = ?', [amount, user[0].id]);
            let today = moment().format('YYYY-MM-DD');
            let transactions = await db.query('SELECT * FROM transactions WHERE created_on BETWEEN ? and ?', [today + ' 00:00:00', today + '23:59:59']);
            let transactionNo = transactions ? transactions.length + 1 : 1;
            let invoiceNo = generateInvoiceNo(transactionNo);
            await db.query('INSERT INTO transactions (invoice_number, user_id, transaction_type, description, total_amount) VALUES (?, ?, ?, ?, ?)', [invoiceNo, user[0].id, "TOPUP", "Top Up balance", amount]);
            let balance = await db.query('SELECT * FROM user_balances WHERE user_id = ?', [user[0].id]);
            return { balance: balance[0].balance };
        }
        else return null;
    } catch (e) {
        throw e;
    }
}

module.exports = { getBalance, topup }