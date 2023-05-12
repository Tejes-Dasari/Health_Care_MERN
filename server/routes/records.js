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

// Update a record
router.put('/update_record/:id', (req, res) => {
  const { name, enrollmentNumber, description } = req.body;
  const recordId = req.params.id;

  Record.findById(recordId)
    .then((record) => {
      if (!record) {
        return res.status(404).json('Record not found');
      }

      record.name = name;
      record.enrollmentNumber = enrollmentNumber;
      record.description = description;

      record
        .save()
        .then(() => res.json('Record updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/delete_record/:id', (req, res) => {
  const recordId = req.params.id;

  Record.findByIdAndDelete(recordId)
    .then((record) => {
      if (!record) {
        return res.status(404).json('Record not found');
      }
      res.json('Record deleted!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;
