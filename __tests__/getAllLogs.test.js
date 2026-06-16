jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const logsController = require('../controllers/logs');
const { mockCollection } = require('./mockDb.util');

describe('GET ALL Logs pattern', () => {
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
                "_id": "666c4d5e6f7a8b9003030301",
                "studentId": "666c1a2b3c4d5e6f7a8b9003",
                "date": "2026-06-15T18:00:00.000Z",
                "classType": "Fundamental Gi Class",
                "matTimeMinutes": 60
            },
            {
                "_id": "666c4d5e6f7a8b9003030302",
                "studentId": "666c1a2b3c4d5e6f7a8b9004",
                "date": "2026-06-15T19:30:00.000Z",
                "classType": "Advanced No-Gi Sparring",
                "matTimeMinutes": 90
            },
            {
                "_id": "666c4d5e6f7a8b9003030303",
                "studentId": "666c1a2b3c4d5e6f7a8b9003",
                "date": "2026-06-17T18:00:00.000Z",
                "classType": "Fundamental Gi Class",
                "matTimeMinutes": 60
            },
        ];

        mockCollection.toArray.mockResolvedValue(fakeDataset);
        await logsController.getAllLogs(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });
})