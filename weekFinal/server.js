require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

// Use your MongoDB Atlas connection string from the .env file
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB Atlas once and keep the connection open
async function connectMongo() {
  try {
    await client.connect();
    // Optional ping to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
connectMongo();

const db = client.db("test");
const dataCollection = db.collection("test_collection");

// GET route: Fetch all data from the collection
app.get('/data', async (req, res) => {
  try {
    const data = await dataCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// POST route: Insert new data into the collection
app.post('/data', async (req, res) => {
  try {
    const result = await dataCollection.insertOne({ text: req.body.text });
    res.json({ _id: result.insertedId, text: req.body.text });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Start the Express server
app.listen(5000, () => console.log('Server running on port 5000'));
