// const MONGDB_URL = await mongoose.connect(process.env.MONGDB_URL);
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect using the MongoDB URI from the environment variable
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;

