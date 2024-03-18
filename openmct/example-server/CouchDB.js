const nano = require('nano')('http://localhost:5984');
require ('dotenv').config();
async function uploadTelemetry(telemetry, value) {
    const dbName = process.env.DB_NAME ;
    const doc = {
        topic: telemetry,
        value: value,
        timestamp: Date.now()
    };

    try {
        const db = nano.db.use(dbName);
        const response = await db.insert(doc);
        console.log('Document uploaded:', response);
    } catch (err) {
        console.error('Error uploading document:', err);
    }
}

module.exports = uploadTelemetry;