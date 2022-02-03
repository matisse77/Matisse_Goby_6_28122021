const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, require('../controllers/sauce/create'));
router.delete('/:id', auth, require('../controllers/sauce/delete'));
router.get('/', auth, require('../controllers/sauce/getAll'));
router.get('/:id', auth, require('../controllers/sauce/getOne'));
router.put('/:id', auth, multer, require('../controllers/sauce/modify'));
router.post('/:id/like', auth, require('../controllers/like'));

module.exports = router;
