const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs');
const { logValidationRules, handleValidationErrors, validateParamId } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', logsController.getAllLogs);

router.get('/:id', validateParamId, logsController.getSingleLog);

router.post('/', isAuthenticated, logValidationRules, logsController.createLog);


router.delete('/:id',isAuthenticated, validateParamId, logsController.deleteLog);

module.exports = router;