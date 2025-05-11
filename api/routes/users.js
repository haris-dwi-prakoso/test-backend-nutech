const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { auth } = require('../middlewares/auth');
const UsersController = require('../controllers/users');

router.post('/registration', UsersController.register);
router.post('/login', UsersController.login);
router.get('/profile', auth, UsersController.profile);
router.put('/profile/update', auth, UsersController.updateProfile);
router.put('/profile/image', [auth, upload.single('file')], UsersController.updateProfileImage);

module.exports = router;