const mongodb = require('../data/db');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
    try {
        //#swagger.tags=['users']
        const result = await mongodb.getDb()
            .collection('users')
            .find({})
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "error in getting the users. " })
    }
};

const getUserById = async (req, res) => {
    try {
        //#swagger.tags=['users']
        const userId = req.params.id;
        const user = await mongodb.getDb().collection('users').findOne({ _id: new ObjectId(userId) })
        
        if (!user) {
            return res.status(404).json({ message: "user is not found" })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "error in getting the user profile. " })
    }
};

const createUser = async (req, res) => {
    try {
        //#swagger.tags=['users']
        const newUser = {
            _id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            tierLevel: req.body.tierLevel,
            joinDate: req.body.joinDate,
            isActive: req.body.isActive
        };
        const response = await mongodb.getDb().collection('users').insertOne(newUser);
        res.status(201).json({ id: response.insertedId })
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
};

const updateUserTier = async (req, res) => {
    try {
        //#swagger.tags=['users']
        const updatedUserId = req.params.id
        const response = await mongodb.getDb().collection('users')
            .updateOne({ _id: new ObjectId(userId) },
                { $set: { tierLevel: req.body.tierLevel } }
            );
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found or tier unchanged" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating user tier" })
    }
};

const deleteUser = async (req, res) => {
    try {
        //#swagger.tags=['users']
        const userId = req.params.id;
        const response = await mongodb.getDb()
            .collection('users')
            .deleteOne({ _id: new ObjectId(userId) });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not located. " })
        }
        
    } catch (err) {
        res.status(500).json({ message: "Error removing user. "})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser, 
    updateUserTier,
    deleteUser
}