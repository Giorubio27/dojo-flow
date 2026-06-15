const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { planValidationRules, handleValidationErrors } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', plansController.getAllPlans);

router.get('/:id', plansController.getSinglePlan);

router.post('/',isAuthenticated, planValidationRules, plansController.createPlan);

router.put('/:id',isAuthenticated, planValidationRules, plansController.updatedPlan);

router.delete('/:id',isAuthenticated, plansController.deletePlan);

module.exports = router;