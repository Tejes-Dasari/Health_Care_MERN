const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = 5000 || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = 'mongodb+srv://abdtejesh2917:3MWe2I5461ELkoKT@cluster0.iriwcno.mongodb.net/';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


const recordsRouter = require('./routes/records');
app.use('/records', recordsRouter);

const stockRoutes = require('./routes/stockRoutes');
app.use('/stock', stockRoutes);

const icePackRecordRoutes = require('./routes/icePackRecordRoutes');
app.use('/icepack_record', icePackRecordRoutes);

app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'myValue', {
    sameSite: 'none',
    secure: true, // also make sure to set secure to true when using SameSite=None
  });
  res.send('Cookie set');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
