const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    // Build query object dynamically based on provided query params
    let query = {};
    if (from) query.from = { $regex: new RegExp(from, 'i') }; // Case-insensitive
    if (to) query.to = { $regex: new RegExp(to, 'i') };
    if (date) query.date = date; // Exact match for date 'YYYY-MM-DD'

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get single flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
