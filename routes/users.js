const express = require('express')
const router = express.Router();
const { userValidationRules, handleValidationErrors } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

const usersController = require('../controllers/users');

router.get('/',isAuthenticated, usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', isAuthenticated, userValidationRules, usersController.createUser);

router.put('/:id',isAuthenticated, userValidationRules, usersController.updateUser);

router.delete('/:id',isAuthenticated, usersController.deleteUser)

module.exports = router