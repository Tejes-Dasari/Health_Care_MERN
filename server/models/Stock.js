const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  medicineName: String,
  inStock: Number,
  description: String,
});

module.exports = mongoose.model('Stock', stockSchema);
