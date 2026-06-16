jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const usersController = require('../controllers/users');
const { mockCollection } = require('./mockDb.util');

describe('GET ALL Users pattern', () => {
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
                "_id": "666c1a2b3c4d5e6f7a8b9001",
                "name": "Giovanni Rubio",
                "email": "giovanni.rubio@dojoflow.com",
                "role": "sensei",
                "tierLevel": "Black Belt",
                "joinDate": "2024-01-15T00:00:00.000Z",
                "isActive": true
            },
            {
                "_id": "666c1a2b3c4d5e6f7a8b9002",
                "name": "Carlos Silva",
                "email": "carlos.silva@dojoflow.com",
                "role": "sensei",
                "tierLevel": "Brown Belt",
                "joinDate": "2024-06-20T00:00:00.000Z",
                "isActive": true
            },
        ];

        mockCollection.toArray.mockResolvedValue(fakeDataset);
        await usersController.getAllUsers(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });
})