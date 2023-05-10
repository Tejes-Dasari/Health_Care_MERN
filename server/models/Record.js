const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
