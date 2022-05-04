const express = require('express')
const PositionController = require('../controllers/PositionController')
const router = express.Router();

router.get('/', PositionController.findAll);
router.get('/:id', PositionController.findOne);
router.post('/', PositionController.create);
router.patch('/:id', PositionController.update);
router.delete('/:id', PositionController.destroy);
module.exports = router
