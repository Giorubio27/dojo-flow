jest.mock('../data/db', () => require('./mockDb.util').mockMongodb);

const usersController = require('../controllers/users');
const { mockCollection } = require('./mockDb.util');
const { ObjectId } = require('mongodb');

describe('GET A SINGLE User by Id pattern', () => {
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

    it('should successfully return status 200 and a single user with a valid Id match', async () => {
        const fakeIdString = new ObjectId().toString();
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
        ];
        req.params.id = fakeIdString

        mockCollection.findOne.mockResolvedValue(fakeDataset);
        await usersController.getUserById(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeDataset);
    });

    it('should return a 404 status and error message when the id doesnt exist', async () => {
        req.params.id = new ObjectId().toString();

        mockCollection.findOne.mockResolvedValue(null);

        await usersController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "user is not found" });
    });
});