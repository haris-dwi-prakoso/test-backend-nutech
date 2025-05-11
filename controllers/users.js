const UsersService = require('../services/users');
const { put } = require('@vercel/blob');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function register(req, res) {
    try {
        const { email, first_name, last_name, password } = req.body;
        let isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            let insert = await UsersService.register(email, password, first_name, last_name);
            if (insert) res.status(200).json({
                status: 0,
                message: "Registrasi berhasil silahkan login",
                data: null
            });
            else res.status(400).json({
                status: 103,
                message: "Email yang dimasukkan sudah terdaftar",
                data: null
            });
        } else res.status(400).json({
            status: 102,
            message: "Parameter email tidak sesuai format",
            data: null
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        let isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            let result = await UsersService.login(email, password);
            if (result.valid) res.status(200).json({
                status: 0,
                message: "Login sukses",
                data: { token: result.token }
            });
            else res.status(400).json({
                status: 103,
                message: "Email atau password salah",
                data: null
            });
        } else res.status(400).json({
            status: 102,
            message: "Parameter email tidak sesuai format",
            data: null
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function profile(req, res) {
    try {
        const { email } = req.token;
        let profile = await UsersService.getProfile(email);
        res.status(200).json({
            status: 0,
            message: "Sukses",
            data: profile
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function updateProfile(req, res) {
    try {
        const { email } = req.token;
        const { first_name, last_name } = req.body;
        let update = await UsersService.updateProfile(email, first_name, last_name);
        res.status(200).json({
            status: 0,
            message: "Update Profile berhasil",
            data: update
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

async function updateProfileImage(req, res) {
    try {
        const { email } = req.token;
        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg'
        ];
        if (!req.file) res.status(400).json({
            status: 103,
            message: "File image harus disertakan",
            data: null
        });
        if (!whitelist.includes(req.file.mimetype)) res.status(400).json({
            status: 103,
            message: "Format image tidak sesuai",
            data: null
        });
        let blob = await put(req.file.originalname, req.file.buffer, { access: 'public' });
        let update = await UsersService.updateProfileImage(email, blob.url);
        res.status(200).json({
            status: 0,
            message: "Update Profile Image berhasil",
            data: update
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: `Terjadi error: ${e.message}`,
            data: null
        });
    }
}

module.exports = { register, login, profile, updateProfile, updateProfileImage };