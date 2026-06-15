const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs');
const { logValidationRules, handleValidationErrors} = require('../middleware/validate')

router.get('/', logsController.getAllLogs);

router.get('/:id', logsController.getSingleLog);

router.post('/', logValidationRules, logsController.createLog);


router.delete('/:id', logsController.deleteLog);

module.exports = router;