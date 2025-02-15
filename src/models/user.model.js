const mongoose = require('mongoose');

class UserModel {
  constructor() {
    this.schema = new mongoose.Schema({
      tag: { type: String },
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      entity: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity', required: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    this.schema.pre('save', function (next) {
      this.updatedAt = new Date();
      next();
    });

    this.model = mongoose.model('User', this.schema); // Create the model
  }

  getModel() {  // Method to get the model
    return this.model;
  }
}

const userModel = new UserModel(); // Create an instance of the model class
module.exports = userModel.getModel(); // Export the actual Mongoose model