const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Get all records
router.get('/all_records', (req, res) => {
  Record.find()
    .then((records) => res.json(records))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Add a new record
router.post('/add_record', (req, res) => {
  const { name, enrollmentNumber, description } = req.body;
  const newRecord = new Record({ name, enrollmentNumber, description });

  newRecord
    .save()
    .then(() => res.json('Record added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
