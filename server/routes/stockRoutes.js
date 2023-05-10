// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Create new stock entry
router.post('/add_stock', (req, res) => {
  const { medicineName, inStock, description } = req.body;
  const newStock = new Stock({ medicineName, inStock, description });
  newStock.save()
    .then(() => res.status(201).json({ message: 'Stock entry created successfully' }))
    .catch(error => res.status(400).json({ error }));
});

// Get all stock entries
router.get('/all_stocks', (req, res) => {
  Stock.find()
    .then(stock => res.status(200).json(stock))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
