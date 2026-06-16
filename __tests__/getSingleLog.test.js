jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const logsController = require('../controllers/logs');
const { mockCollection } = require('./mockDb.util');
const { ObjectId } = require('mongodb');

describe('GET A SINGLE Log by Id pattern', () => {
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

    it('should successfully return status 200 and a single log with a valid Id match', async () => {
        const fakeIdString = new ObjectId().toString();
        const fakeDataset = [
            {
                "_id": "666c4d5e6f7a8b9003030303",
                "studentId": "666c1a2b3c4d5e6f7a8b9003",
                "date": "2026-06-17T18:00:00.000Z",
                "classType": "Fundamental Gi Class",
                "matTimeMinutes": 60
            }
        ];
        req.params.id = fakeIdString

        mockCollection.findOne.mockResolvedValue(fakeDataset);
        await logsController.getSingleLog(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });

    it('should return a 404 status and error message when the id doesnt exist', async () => {
        req.params.id = new ObjectId().toString();

        mockCollection.findOne.mockResolvedValue(null);

        await logsController.getSingleLog(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Attendance log not found" });
    });
});