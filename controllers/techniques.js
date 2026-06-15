const mongodb = require('../data/db');
const { ObjectId } = require('mongodb');

const getAllTechniques = async (req, res) => {
  try {
    //#swagger.tags=['techniques']
    let filter = {};
    if (req.query.planId) {
      if (!ObjectId.isValid(req.query.planId)) {
        return res.status(400).json({ message: 'Invalid planId' });
      }
      filter.planId = new ObjectId(req.query.planId);
    }
    const result = await mongodb
      .getDb()
      .collection('techniques')
      .find(filter)
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error('Error retrieving techniques:', err);
    res.status(500).json({ message: 'Error retrieving techniques library' });
  }
};

const getTechniqueById = async (req, res) => {
    try {
        //#swagger.tags=['techniques']
        const techId = req.params.id;
        const technique = await mongodb.getDb()
            .collection('techniques')
            .findOne({ _id: new ObjectId(techId) });
        if (!technique) {
            return res.status(404).json({ message: "Could not find technique." })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(technique);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving specific technique" })
    }
};

const createTechnique = async (req, res) => {
    try {
        //#swagger.tags=['techniques']
        const newTech = {
            _id: req.body._id,
            planId: req.body.planId,
            name: req.body.name,
            category: req.body.category,
            difficulty: req.body.difficulty,
            steps: req.body.steps,
            videoUrl: req.body.videoUrl,
            lastUpdatedBy: req.body.lastUpdatedBy
        }
        const response = await mongodb.getDb()
            .collection('techniques').insertOne(newTech);
        res.status(201).json({ id: response.insertedId })
    } catch (err) {
        res.status(500).json({ message: "Error saving technique entry. " })
    }
};

const updateTechnique = async (req, res) => {
    try {
        //#swagger.tags=['techniques']
        const techId = req.params.id;
        const updateTechnique = {
            planId: req.body.planId,
            name: req.body.name,
            category: req.body.category,
            difficulty: req.body.difficulty,
            steps: req.body.steps,
            videoUrl: req.body.videoUrl,
            lastUpdatedBy: req.body.lastUpdatedBy
        };
        const response = await mongodb.getDb()
            .collection('techniques').replaceOne({ _id: new ObjectId(techId) }, updateTechnique);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Technique not found or data is identical" })
        }
    } catch (err) {
        res.status(500).json({ message: "Error modifying technique registry" })
    }
};

const deleteTechnique = async (req, res) => {
    try {
        //#swagger.tags=['techniques']
        const techId = req.params.id;
        const response = await mongodb.getDb()
            .collection('techniques')
            .deleteOne({ _id: new ObjectId(techId) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Technique entry not located. " })
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting this user" })
    }
};

module.exports = {
    getAllTechniques,
    getTechniqueById, createTechnique,
    updateTechnique, deleteTechnique
}