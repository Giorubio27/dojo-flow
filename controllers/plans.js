const mongodb = require('../data/db');
const { ObjectId } = require('mongodb');

const getAllPlans = async (req, res) => {
    try {
        //#swagger.tags=['plans']
        const result = await mongodb.getDb()
            .collection('plans')
            .find({})
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving plans" })
    }
};

const getSinglePlan = async (req, res) => {
    try {
        //#swagger.tags=['plans']
        const planId = req.params.id;
        const plan = await mongodb.getDb()
            .collection('plans')
            .findOne({ _id: new ObjectId(planId) })
        
        if (!plan) {
            return res.status(404).json({ message: "Training plan not found" })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(plan)
    } catch (err) {
        res.status(500).json({ message: "Error retrieving training plan" })
    }
};

const createPlan = async (req, res) => {
    try {
        //#swagger.tags=['plans']
        const newPlan = {
            _id: req.body._id,
            weekCommencing: req.body.weekCommencing,
            focusArea: req.body.focusArea,
            difficultyTier: req.body.difficultyTier,
            description: req.body.description
        };
        const response = await mongodb.getDb()
            .collection('plans')
            .insertOne(newPlan)
        res.status(201).json({ id: response.insertedId })
    } catch (err) {
        res.status(500).json({ message: "Error creating training plan" })
    }
};

const updatedPlan = async (req, res) => {
    try {
        //#swagger.tags=['plans']
        updatedPlanId = req.params.id;
        updatedPlan = {
            weekCommencing: req.body.weekCommencing,
            focusArea: req.body.focusArea,
            difficultyTier: req.body.difficultyTier,
            description: req.body.description
        };
        const response = await mongodb.getDb()
            .collection('plans')
            .replaceOne({ _id: new ObjectId(planId) }, updatedPlan);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Training plan not found" })
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating training plan." })
    }
};

const deletePlan = async (req, res) => {
    try {
        //#swagger.tags=['plans']
        const planId = req.params.id;
        const response = await mongodb.getDb()
            .collection('plans')
            .deleteOne({ _id: new ObjectId(planId) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else { 
            res.status(404).json({ message: "Training plan not found"})
        }
    } catch (err) {
        res.status(500).json({ message: "Error removing training plan. "})
    }
    
}

module.exports = {
    getAllPlans,
    getSinglePlan,
    createPlan, 
    updatedPlan, 
    deletePlan
}