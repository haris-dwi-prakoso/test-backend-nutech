const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(email, password, first_name, last_name) {
    try {
        let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            let encryptedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
            let result = await db.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)', [email, encryptedPassword, first_name, last_name]);
            await db.query('INSERT INTO user_balances (user_id) VALUES (?)', [result.insertId]);
            return result;
        } else return null;
    } catch (e) {
        throw e;
    }
}

async function login(email, password) {
    try {
        let result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (result) {
            let user = result[0];
            let matchPassword = bcrypt.compareSync(password, user.password);
            if (matchPassword) {
                let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '12h' });
                return {
                    valid: true,
                    token: token
                }
            } else return {
                valid: false,
                token: null
            }
        } else return {
            valid: false,
            token: null
        }
    } catch (e) {
        throw e;
    }
}

async function getProfile(email) {
    try {
        let result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (result) return {
            email: result[0].email,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            profile_image: result[0].profile_image
        }
        else return null;
    } catch (e) {
        throw e;
    }
}

async function updateProfile(email, first_name, last_name) {
    try {
        await db.query('UPDATE users SET first_name = ?, last_name = ? WHERE email = ?', [first_name, last_name, email]);
        let result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (result) return {
            email: result[0].email,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            profile_image: result[0].profile_image
        }
        else return null;
    } catch (e) {
        throw e;
    }
}

async function updateProfileImage(email, imageUrl) {
    try {
        await db.query('UPDATE users SET profile_image = ? WHERE email = ?', [imageUrl, email]);
        let result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (result) return {
            email: result[0].email,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            profile_image: result[0].profile_image
        }
        else return null;
    } catch (e) {
        throw e;
    }
}

module.exports = { register, login, getProfile, updateProfile, updateProfileImage };