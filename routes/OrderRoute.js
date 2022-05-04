const express = require('express')
const OrderController = require('../controllers/OrderController')
const router = express.Router();

router.get('/', OrderController.findAll);
router.get('/:id', OrderController.findOne);
router.post('/', OrderController.create);
router.patch('/:id', OrderController.update);
router.delete('/:id', OrderController.destroy);
module.exports = router
