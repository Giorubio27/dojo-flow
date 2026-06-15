const express = require('express');
const router = express.Router();
const techniquesController = require('../controllers/techniques');
const { techniqueValidationRules, handleValidationErrors, validateParamId } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', techniquesController.getAllTechniques);

router.get('/:id', validateParamId, techniquesController.getTechniqueById);

router.post('/',isAuthenticated, techniqueValidationRules, techniquesController.createTechnique);

router.put('/:id',isAuthenticated, validateParamId, techniqueValidationRules, techniquesController.updateTechnique);

router.delete('/:id',isAuthenticated, validateParamId, techniquesController.deleteTechnique);

module.exports = router;