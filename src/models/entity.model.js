const mongoose = require('mongoose');

class EntityModel {
  constructor() {
    this.schema = new mongoose.Schema({
      tag: { type: String },
      name: { type: String, required: true, unique: true },
      type: { type: String, required: true, enum: [ 'household', 'business' ] },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    this.schema.pre('save', function (next) {
      this.updatedAt = new Date();
      next();
    });

    this.model = mongoose.model('Entity', this.schema); // Create the model
  }

  getModel() {  // Method to get the model
    return this.model;
  }
}

const entityModel = new EntityModel(); // Create an instance of the model class
module.exports = entityModel.getModel(); // Export the actual Mongoose model