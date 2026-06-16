const mockCollection = {
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    replaceOne: jest.fn(),
    deleteOne: jest.fn()
};

const mockDbInstance = {
    collection: jest.fn(() => mockCollection)
}

const mockMongodb = {
    getDb: jest.fn(() => mockDbInstance),
    initDb: jest.fn().mockResolvedValue(true)
};

module.exports = {
    mockMongodb,
    mockCollection
}