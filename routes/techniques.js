const express = require('express');
const router = express.Router();
const techniquesController = require('../controllers/techniques');

router.get('/', techniquesController.getAllTechniques);

router.get('/:id', techniquesController.getTechniqueById);

router.post('/', techniquesController.createTechnique);

router.put('/:id', techniquesController.updateTechnique);

router.delete('/:id', techniquesController.deleteTechnique);

module.exports = router;