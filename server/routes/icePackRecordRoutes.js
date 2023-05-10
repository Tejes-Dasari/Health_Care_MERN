const express = require('express');
const router = express.Router();
const IcePackRecord = require('../models/IcePackRecord');
const nodemailer = require('nodemailer');

// Get all ice pack records
router.get('/', async (req, res) => {
  try {
    const icePackRecords = await IcePackRecord.find();
    res.json(icePackRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new ice pack record
router.post('/', async (req, res) => {
  const icePackRecord = new IcePackRecord({
    name: req.body.name,
    icepackCount: req.body.icepackCount,
    email: req.body.email
  });

  try {
    const newIcePackRecord = await icePackRecord.save();
    res.status(201).json(newIcePackRecord);
    // Send email after 1 minute
    setTimeout(async () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.email,
        subject: 'Icepack return remainder',
        text: 'This is a reminder to return your Icepack.'
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    }, 30000);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
