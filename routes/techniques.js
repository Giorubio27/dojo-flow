const express = require('express');
const router = express.Router();
const techniquesController = require('../controllers/techniques');
const {techniqueValidationRules, handleValidationErrors} = require('../middleware/validate')

router.get('/', techniquesController.getAllTechniques);

router.get('/:id', techniquesController.getTechniqueById);

router.post('/', techniqueValidationRules, techniquesController.createTechnique);

router.put('/:id',techniqueValidationRules, techniquesController.updateTechnique);

router.delete('/:id', techniquesController.deleteTechnique);

module.exports = router;