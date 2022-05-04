const express = require('express')
const RoleController = require('../controllers/RolesController')
const router = express.Router();

router.get('/', RoleController.findAll);
router.get('/:id', RoleController.findOne);
router.post('/', RoleController.create);
router.patch('/:id', RoleController.update);
router.delete('/:id', RoleController.destroy);
module.exports = router
