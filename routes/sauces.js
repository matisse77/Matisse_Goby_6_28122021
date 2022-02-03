const express = require('express');
const router = express.Router();
const { likeSauce } = require('../controllers/like');
const { createSauce } = require('../controllers/sauce/create');
const { deleteSauce } = require('../controllers/sauce/delete');
const { getAllSauce } = require('../controllers/sauce/getAll');
const { getOneSauce } = require('../controllers/sauce/getOne');
const { modifySauce } = require('../controllers/sauce/modify');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, createSauce);
router.delete('/:id', auth, deleteSauce);
router.get('/', auth, getAllSauce);
router.get('/:id', auth, getOneSauce);
router.put('/:id', auth, multer, modifySauce);
router.post('/:id/like', auth, likeSauce);

module.exports = router;
