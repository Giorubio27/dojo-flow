const mongodb = require('../data/db');
const { ObjectId } = require('mongodb');

const getAllLogs = async (req, res) => {
    try {
        //#swagger.tags=['logs']
        const result = await mongodb.getDb()
            .collection('logs').find({})
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving checking metrics." })
    }
};

const getSingleLog = async (req, res) => {
    try {
        //#swagger.tags=['logs']
        const logId = req.params.id;
        const log = await mongodb.getDb()
            .collection('logs').findOne({ _id: new ObjectId(logId) });
        
        if (!log) {
            return res.status(404).json({ message: "Attendance log not found" })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving attendance log." });
    }
};

const createLog = async (req, res) => {
    try {
        //#swagger.tags=['logs']
        const newLog = {
            
            studentId: req.body.studentId,
            date: req.body.date,
            classType: req.body.classType,
            matTimeMinutes: parseInt(req.body.matTimeMinutes)
        };
        const response = await mongodb.getDb()
            .collection('logs')
            .insertOne(newLog);
        res.status(201).json({ id: response.insertedId })
    } catch (err) {
        res.status(500).json({ message: "Error processing attendance entry. " })
    }
};

const deleteLog = async (req, res) => {
    try {
        //#swagger.tags=['logs']
        const logId = req.params.id;
        const response = await mongodb.getDb()
            .collection('logs')
            .deleteOne({ _id: new ObjectId(logId) });
        
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Log registry not found." })
        }
    } catch (err) {
        res.status(500).json({ message: "Error removing the attendance log" })
    }
};

module.exports = {
    getAllLogs,
    getSingleLog, 
    createLog, 
    deleteLog
}