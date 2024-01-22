const mongo = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
let dbCollection = null;


async function connectToDatabase() {
    
  
    const client = new mongo.MongoClient(process.env.DB_URI);
  
    await client.connect();
  
    const db = client.db(process.env.DB_NAME);
    dbCollection = db.collection(process.env.DB_COLLECTION);
    console.log("connected to the database");
    
}
connectToDatabase();
exports.module = dbCollection;