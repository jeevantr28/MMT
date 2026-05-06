const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true }, // Store as YYYY-MM-DD
  price: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
