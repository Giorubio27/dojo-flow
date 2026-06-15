const express = require('express')
const router = express.Router();
const { userValidationRules, handleValidationErrors, validateParamId } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

const usersController = require('../controllers/users');

router.get('/',isAuthenticated, usersController.getAllUsers);

router.get('/:id',validateParamId, usersController.getUserById);

router.post('/', isAuthenticated, userValidationRules, usersController.createUser);

router.put('/:id',isAuthenticated,validateParamId, userValidationRules, usersController.updateUser);

router.delete('/:id',isAuthenticated,validateParamId, usersController.deleteUser)

module.exports = router