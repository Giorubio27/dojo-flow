jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const techniquesController = require('../controllers/techniques');
const { mockCollection } = require('./mockDb.util');

describe('GET ALL Techniques', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn()
        };
    });

    it('Should successfully retrieve all the techniques and a 200 status', async () => {
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
        ]
        mockCollection.toArray.mockResolvedValue(fakeDataset);

        await techniquesController.getAllTechniques(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });
})