const express = require('express')
const CartController = require('../controllers/CartController')
const router = express.Router();

router.get('/', CartController.findAll);
router.get('/:id', CartController.findOne);
router.post('/', CartController.create);
router.patch('/:id', CartController.update);
router.delete('/:id', CartController.destroy);

module.exports = router
