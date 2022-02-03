const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const pwd = require('../middleware/password');

router.post('/signup', pwd, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
