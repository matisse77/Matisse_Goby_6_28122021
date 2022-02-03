const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const createSauceCtrl = require('../controllers/sauce/create');
const deleteSauceCtrl = require('../controllers/sauce/delete');
const getAllSauceCtrl = require('../controllers/sauce/getAll');
const getOneSauceCtrl = require('../controllers/sauce/getOne');
const modifySauceCtrl = require('../controllers/sauce/modify');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, createSauceCtrl.createSauce);
router.delete('/:id', auth, deleteSauceCtrl.deleteSauce);
router.get('/', auth, getAllSauceCtrl.getAllSauce);
router.get('/:id', auth, getOneSauceCtrl.getOneSauce);
router.put('/:id', auth, multer, modifySauceCtrl.modifySauce);
router.post('/:id/like', auth, likeCtrl.likeSauce);

module.exports = router;
