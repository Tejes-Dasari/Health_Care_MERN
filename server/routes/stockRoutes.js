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

// Update a record
router.put('/update_stock/:id', (req, res) => {
  const { medicineName, inStock, description } = req.body;
  const stockId = req.params.id;

  Stock.findById(stockId)
    .then((stock) => {
      if (!stock) {
        return res.status(404).json('Record not found');
      }

      stock.medicineName = medicineName;
      stock.inStock = inStock;
      stock.description = description;

      stock
        .save()
        .then(() => res.json('Stock updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/delete_stock/:id', (req, res) => {
  const stockId = req.params.id;

  Stock.findByIdAndDelete(stockId)
    .then((stock) => {
      if (!stock) {
        return res.status(404).json('Stock not found');
      }
      res.json('Stock deleted!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;
