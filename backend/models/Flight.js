const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true }, // Store as YYYY-MM-DD
  price: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, default: 180 },
  bookedSeats: [{ type: String }] // Array of seat numbers like "1A", "1B", etc.
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
