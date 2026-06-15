const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plans');

router.get('/', plansController.getAllPlans);

router.get('/:id', plansController.getSinglePlan);

router.post('/', plansController.createPlan);

router.put('/:id', plansController.updatedPlan);

router.delete('/:id', plansController.deletePlan);

module.exports = router;