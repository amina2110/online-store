const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:email', UserController.findOne);
router.post('/', UserController.create);
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.patch('/:email', UserController.update);
router.delete('/:email', UserController.destroy);

module.exports = router
