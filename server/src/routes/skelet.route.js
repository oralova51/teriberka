const express = require('express');
const SkeletController = require('../controllers/skelet.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', verifyAccessToken, SkeletController.getAllSkelets);
router.post('/', verifyAccessToken, SkeletController.createSkelet);
router.get('/:id', isValidId, SkeletController.getSkeletById);
router.put('/:id', isValidId, verifyAccessToken, SkeletController.updateSkelet);
router.delete('/:id', isValidId, verifyAccessToken, SkeletController.deleteSkelet);

module.exports = router;
