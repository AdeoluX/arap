const mongoose = require('mongoose');

class DatabaseConnector {
  constructor() {
    this.mongoURI = process.env.MONGO_URI; // Get MongoDB URI from environment variables
    if (!this.mongoURI) {
      throw new Error("MONGO_URI environment variable must be set.");
    }
    this.db = null; // Store the database connection object
  }

  async connect() {
    try {
      this.db = await mongoose.connect(this.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      return this.db; // Return the connection object
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async disconnect() {
    if (this.db) {
      try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
      } catch (error) {
        console.error('Failed to disconnect from MongoDB:', error);
        throw error;
      }
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }
}

module.exports = DatabaseConnector;