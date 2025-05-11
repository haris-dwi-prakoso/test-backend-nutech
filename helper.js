const moment = require('moment');

function removeProperty(object, property) {
    const { [property]: unused, ...rest } = object;
    return rest;
}

function generateInvoiceNo(transactionNo) {
    return "INV" + moment().format("DDMMYYYY") + String(transactionNo).padStart(3, "0");
}

module.exports = { removeProperty, generateInvoiceNo };