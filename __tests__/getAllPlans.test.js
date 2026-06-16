jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const plansController = require('../controllers/plans');
const { mockCollection } = require('./mockDb.util');

describe('GET ALL Plans pattern', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            setHeader: jest.fn()
        };
    });

    it('should successfully return status 200 and an entire collection array', async () => {
        const fakeDataset = [
            {
                "_id": "666c2b3c4d5e6f7a8b900101",
                "weekCommencing": "2026-06-15T00:00:00.000Z",
                "focusArea": "Side Control Escapes",
                "difficultyTier": "Beginner",
                "description": "This week focuses on rebuilding frames, hip escaping, and recovering full guard when pinned under solid heavy side control."
            },
            {
                "_id": "666c2b3c4d5e6f7a8b900102",
                "weekCommencing": "2026-06-22T00:00:00.000Z",
                "focusArea": "Single Leg Takedowns & Finishes",
                "difficultyTier": "Intermediate",
                "description": "Transitioning from wrestling ties into clean single leg entries, finishing with the pipe-running technique and sweeping the leg."
            },
        ];

        mockCollection.toArray.mockResolvedValue(fakeDataset);
        await plansController.getAllPlans(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });
})