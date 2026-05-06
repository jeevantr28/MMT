const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { flightId, passengerName, passengerAge, seatNumber } = req.body;

    // Validate input
    if (!seatNumber) {
      return res.status(400).json({ message: 'Seat number is required' });
    }

    // Check if flight exists
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Check if seat is already booked
    if (flight.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    // Add seat to bookedSeats
    flight.bookedSeats.push(seatNumber);
    await flight.save();

    const newBooking = new Booking({
      userId: req.user.id,
      flightId,
      passengerName,
      passengerAge,
      seatNumber
    });

    const booking = await newBooking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Optional: Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('flightId');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
