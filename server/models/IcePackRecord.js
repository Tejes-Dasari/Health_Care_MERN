const mongoose = require('mongoose');

const icePackRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icepackCount: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IcePackRecord', icePackRecordSchema);

