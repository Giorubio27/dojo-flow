const express = require('express');
const router = express.Router();
const techniquesController = require('../controllers/techniques');
const { techniqueValidationRules, handleValidationErrors } = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/auth');

router.get('/', techniquesController.getAllTechniques);

router.get('/:id', techniquesController.getTechniqueById);

router.post('/',isAuthenticated, techniqueValidationRules, techniquesController.createTechnique);

router.put('/:id',isAuthenticated, techniqueValidationRules, techniquesController.updateTechnique);

router.delete('/:id',isAuthenticated, techniquesController.deleteTechnique);

module.exports = router;