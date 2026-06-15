require("dotenv").config();
// data/database.js
const { MongoClient } = require("mongodb");

let db;
let client;

async function initDb() {
    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        db = client.db('DojoFlow'); // uses the database name from the URI
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.error("Unable to connect to database", error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call initDb() first.");
    }
    return db;
}

module.exports = {
    initDb,
    getDb,
};




