const express = require('express');
const router = express.Router();

const logsController = require('../controllers/logs');

router.get('/', logsController.getAllLogs);

router.get('/:id', logsController.getSingleLog);

router.post('/', logsController.createLog);


router.delete('/:id', logsController.deleteLog);

module.exports = router;