const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Details', workoutSchema)