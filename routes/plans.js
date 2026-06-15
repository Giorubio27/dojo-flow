const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');
const { planValidationRules, handleValidationErrors} = require('../middleware/validate');

router.get('/', plansController.getAllPlans);

router.get('/:id', plansController.getSinglePlan);

router.post('/',planValidationRules, plansController.createPlan);

router.put('/:id',planValidationRules, plansController.updatedPlan);

router.delete('/:id', plansController.deletePlan);

module.exports = router;