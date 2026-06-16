jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const techniquesController = require('../controllers/techniques');
const { mockCollection } = require('./mockDb.util');
const { ObjectId } = require('mongodb');

describe('GET A SINGLE technique by Id pattern', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn()
        };
    });

    it('should successfully return status 200 and a single technique with a valid Id match', async () => {
        const fakeIdString = new ObjectId().toString();
        const fakeDataset = [
            {
            "_id": "666c3c4d5e6f7a8b90020203",
            "planId": "666c2b3c4d5e6f7a8b900102",
            "name": "Head-Inside Single Leg Entry",
            "category": "Takedown",
            "difficulty": "Medium",
            "steps": [
                "Change levels low to clear the opponent's lead hand framing.",
                "Step deeply between their feet with your lead attacking foot.",
                "Wrap both hands tightly around their thigh, locking your hands behind their knee.",
                "Keep your forehead pressed securely into their ribs to eliminate counter frames."
            ],
            "videoUrl": "https://media.dojoflow.com/videos/single-leg-entry.mp4",
            "lastUpdatedBy": "666c1a2b3c4d5e6f7a8b9001"
            }
        ];
        req.params.id = fakeIdString

        mockCollection.findOne.mockResolvedValue(fakeDataset);
        await techniquesController.getTechniqueById(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });

    it('should return a 404 status and error message when the id doesnt exist', async () => {
        req.params.id = new ObjectId().toString();

        mockCollection.findOne.mockResolvedValue(null);

        await techniquesController.getTechniqueById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Could not find technique." });
    });
});