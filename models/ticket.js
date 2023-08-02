const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  category: { type: String, required: true },
  color: { type: String },
  title: { type: String, required: true },
  owner: { type: String, required: true },
  avatar: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: Number, required: true },
  progress: { type: Number, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
