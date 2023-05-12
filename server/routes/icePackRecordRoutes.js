const express = require("express");
const router = express.Router();
const IcePackRecord = require("../models/IcePackRecord");
const nodemailer = require("nodemailer");

// Get all ice pack records
router.get("/", async (req, res) => {
  try {
    const icePackRecords = await IcePackRecord.find();
    res.json(icePackRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new ice pack record
router.post("/", async (req, res) => {
  const icePackRecord = new IcePackRecord({
    name: req.body.name,
    icepackCount: req.body.icepackCount,
    email: req.body.email,
  });

  try {
    const newIcePackRecord = await icePackRecord.save();
    res.status(201).json(newIcePackRecord);
    // Send email after 1 minute
    setTimeout(async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.email,
        subject: "Icepack return remainder",
        html: `
    <div style="text-align:center">
      <img src="https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/62/cd/f5/62cdf5b2-a731-76ca-aa69-fe82c8a09d94/source/512x512bb.jpg" alt="Logo" style="width: 100px; height: 100px;">
      <h1>Health Care NU</h1>
    </div>
    <p>Dear ${req.body.name},</p>
    <p>This is a reminder to return your icepack.</p>
    <p>Thank you, have a nice day 🙂.</p>
  `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    }, 10000);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an ice pack record by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await IcePackRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
