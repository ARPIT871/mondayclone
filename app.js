require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT;

const Ticket = require('./models/ticket'); // Assuming you have a Ticket model defined

const url = process.env.MONGO_URL 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().limit(20);
    res.status(200).json(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.post('/tickets', async (req, res) => {
  const formData = req.body.formData;

  try {
    const newTicket = await Ticket.create(formData);
    res.status(200).json(newTicket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.get('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;

  try {
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.put('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;
  const data = req.body.data;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updatedTicket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.delete('/tickets/:documentId', async (req, res) => {
  const id = req.params.documentId;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    res.status(200).json(deletedTicket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
