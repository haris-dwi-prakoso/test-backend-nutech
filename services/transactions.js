const db = require('./db');
const { generateInvoiceNo } = require('../helper');
const moment = require('moment');

async function createTransaction(email, serviceCode) {
    try {
        let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user) {
            let service = await db.query('SELECT * FROM services WHERE service_code = ?', [serviceCode]);
            if (service) {
                let balance = await db.query('SELECT * FROM user_balances WHERE user_id = ?', [user[0].id]);
                if (balance[0].balance < service[0].service_tariff) {
                    return {
                        valid: false,
                        message: "Saldo tidak cukup",
                        data: null
                    }
                } else {
                    await db.query('UPDATE user_balances SET balance = balance - ? WHERE user_id = ?', [service[0].service_tariff, user[0].id]);
                    let today = moment().format('YYYY-MM-DD');
                    let transactions = await db.query('SELECT * FROM transactions WHERE created_on BETWEEN ? and ?', [today + ' 00:00:00', today + '23:59:59']);
                    let transactionNo = transactions ? transactions.length + 1 : 1;
                    let invoiceNo = generateInvoiceNo(transactionNo);
                    await db.query('INSERT INTO transactions (invoice_number, user_id, transaction_type, description, total_amount) VALUES (?, ?, ?, ?, ?)', [invoiceNo, user[0].id, "PAYMENT", service[0].service_name, service[0].service_tariff]);
                    let transactionData = await db.query('SELECT * FROM transactions WHERE invoice_number = ?', [invoiceNo]);
                    return {
                        valid: true,
                        message: "Transaksi berhasil",
                        data: {
                            invoice_number: invoiceNo,
                            service_code: serviceCode,
                            service_name: service[0].service_name,
                            transaction_type: "PAYMENT",
                            total_amount: service[0].service_tariff,
                            created_on: moment(transactionData[0].created_on).toISOString()
                        }
                    }
                }
            }
            else return {
                valid: false,
                message: "Service atau Layanan tidak ditemukan",
                data: null
            }
        }
        else return {
            valid: false,
            message: "User tidak ditemukan",
            data: null
        }
    } catch (e) {
        throw e
    }
}

async function getHistory(email, limit, offset) {
    try {
        let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user) {
            let query = (limit && limit !== undefined) ? 'SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_id = ? LIMIT ? OFFSET ?' : 'SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_id = ?';
            let params = (limit && limit !== undefined) ? [user[0].id, limit, offset] : [user[0].id];
            let transactions = await db.query(query, params);
            transactions = transactions.map(x => x.created_on = moment(x.created_on).toISOString());
            let returnData = (limit && limit !== undefined) ? {
                limit: limit,
                offset: offset,
                records: transactions
            } : {
                records: transactions
            }
            return returnData;
        } else return null;
    } catch (e) {
        throw e;
    }
}

module.exports = { createTransaction, getHistory }