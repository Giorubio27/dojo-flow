const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { planValidationRules, handleValidationErrors, validateParamId } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', plansController.getAllPlans);

router.get('/:id', validateParamId, plansController.getSinglePlan);

router.post('/',isAuthenticated, planValidationRules, plansController.createPlan);

router.put('/:id',isAuthenticated, validateParamId, planValidationRules, plansController.updatedPlan);

router.delete('/:id',isAuthenticated, validateParamId, plansController.deletePlan);

module.exports = router;