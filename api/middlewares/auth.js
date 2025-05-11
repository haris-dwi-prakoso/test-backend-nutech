const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.token = decoded;

        next();
    } catch (err) {
        res.status(401).json({
            status: 108,
            message: "Token tidak valid atau kadaluwarsa",
            data: null
        });
    }
}

module.exports = { auth }