const mongoose = require('mongoose');

class WalletModel {
  constructor() {
    this.schema = new mongoose.Schema({
      balance: { type: Number, defaultValue: 0 },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity', required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    this.schema.pre('save', function (next) {
      this.updatedAt = new Date();
      next();
    });

    this.model = mongoose.model('Wallet', this.schema); // Create the model
  }

  getModel() {  // Method to get the model
    return this.model;
  }
}

const walletModel = new WalletModel(); // Create an instance of the model class
module.exports = walletModel.getModel(); // Export the actual Mongoose model