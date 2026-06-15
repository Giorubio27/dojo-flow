const express = require('express')
const router = express.Router();
const { userValidationRules, handleValidationErrors } = require('../middleware/validate');

const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', userValidationRules, usersController.createUser);

router.put('/:id', userValidationRules, usersController.updateUser);

router.delete('/:id', usersController.deleteUser)

module.exports = router