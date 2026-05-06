require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

const baseFlights = [
  // ===== DELHI → MUMBAI =====
  {
    airline: 'IndiGo',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-10',
    price: 4500,
    departureTime: '06:00 AM',
    arrivalTime: '08:10 AM'
  },
  {
    airline: 'Air India',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-10',
    price: 5200,
    departureTime: '09:30 AM',
    arrivalTime: '11:40 AM'
  },
  {
    airline: 'Vistara',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-10',
    price: 6000,
    departureTime: '02:00 PM',
    arrivalTime: '04:15 PM'
  },
  {
    airline: 'SpiceJet',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-10',
    price: 4800,
    departureTime: '07:00 PM',
    arrivalTime: '09:10 PM'
  },

  // Same route different day
  {
    airline: 'IndiGo',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-11',
    price: 4600,
    departureTime: '06:30 AM',
    arrivalTime: '08:40 AM'
  },
  {
    airline: 'Air India',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-11',
    price: 5100,
    departureTime: '01:00 PM',
    arrivalTime: '03:15 PM'
  },

  // ===== DELHI → BANGALORE =====
  {
    airline: 'Air India',
    from: 'Delhi',
    to: 'Bangalore',
    date: '2026-05-10',
    price: 5500,
    departureTime: '07:30 AM',
    arrivalTime: '10:20 AM'
  },
  {
    airline: 'IndiGo',
    from: 'Delhi',
    to: 'Bangalore',
    date: '2026-05-10',
    price: 5300,
    departureTime: '12:00 PM',
    arrivalTime: '02:45 PM'
  },
  {
    airline: 'Vistara',
    from: 'Delhi',
    to: 'Bangalore',
    date: '2026-05-10',
    price: 6100,
    departureTime: '06:00 PM',
    arrivalTime: '08:50 PM'
  },

  // ===== MUMBAI → GOA =====
  {
    airline: 'IndiGo',
    from: 'Mumbai',
    to: 'Goa',
    date: '2026-05-15',
    price: 3500,
    departureTime: '08:00 AM',
    arrivalTime: '09:10 AM'
  },
  {
    airline: 'SpiceJet',
    from: 'Mumbai',
    to: 'Goa',
    date: '2026-05-15',
    price: 3200,
    departureTime: '01:00 PM',
    arrivalTime: '02:15 PM'
  },
  {
    airline: 'Akasa Air',
    from: 'Mumbai',
    to: 'Goa',
    date: '2026-05-15',
    price: 3700,
    departureTime: '06:30 PM',
    arrivalTime: '07:45 PM'
  },

  // ===== DELHI → GOA =====
  {
    airline: 'Go First',
    from: 'Delhi',
    to: 'Goa',
    date: '2026-05-15',
    price: 7000,
    departureTime: '11:00 AM',
    arrivalTime: '01:40 PM'
  },
  {
    airline: 'IndiGo',
    from: 'Delhi',
    to: 'Goa',
    date: '2026-05-15',
    price: 6800,
    departureTime: '05:00 PM',
    arrivalTime: '07:30 PM'
  },

  // ===== BANGALORE → CHENNAI =====
  {
    airline: 'SpiceJet',
    from: 'Bangalore',
    to: 'Chennai',
    date: '2026-05-11',
    price: 2500,
    departureTime: '09:00 AM',
    arrivalTime: '10:10 AM'
  },
  {
    airline: 'IndiGo',
    from: 'Bangalore',
    to: 'Chennai',
    date: '2026-05-11',
    price: 2700,
    departureTime: '03:00 PM',
    arrivalTime: '04:10 PM'
  },

  // ===== CHENNAI → HYDERABAD =====
  {
    airline: 'AirAsia India',
    from: 'Chennai',
    to: 'Hyderabad',
    date: '2026-05-16',
    price: 3000,
    departureTime: '10:00 AM',
    arrivalTime: '11:15 AM'
  },
  {
    airline: 'IndiGo',
    from: 'Chennai',
    to: 'Hyderabad',
    date: '2026-05-16',
    price: 3200,
    departureTime: '06:30 PM',
    arrivalTime: '07:45 PM'
  }
];

// We will expand these base flights by adding variations (different times, slight price changes, different airlines)
const seedFlights = [];
const extraAirlines = ['IndiGo', 'Vistara', 'Air India', 'SpiceJet', 'Akasa Air'];
const times = ['05:00 AM', '08:30 AM', '11:15 AM', '02:45 PM', '05:30 PM', '08:00 PM', '10:15 PM'];

baseFlights.forEach(baseFlight => {
  // Always keep the original flight
  seedFlights.push(baseFlight);

  // Add 8 more variations for this exact route and date so the search looks full!
  for (let i = 0; i < 8; i++) {
    const randomAirline = extraAirlines[Math.floor(Math.random() * extraAirlines.length)];
    const priceVariance = Math.floor(Math.random() * 2000) - 1000; // -1000 to +1000
    const newPrice = Math.max(2000, baseFlight.price + priceVariance); // Keep price > 2000

    // Just mock varying departure times, arriving 2 hours later roughly
    const timeIdx = Math.floor(Math.random() * times.length);
    const depTime = times[timeIdx];
    const arrTimeStr = parseInt(depTime.split(':')[0]) + 2;
    const arrTime = `${arrTimeStr > 12 ? arrTimeStr - 12 : arrTimeStr}:30 ${depTime.includes('AM') ? (arrTimeStr >= 12 ? 'PM' : 'AM') : 'PM'}`;

    seedFlights.push({
      airline: randomAirline,
      from: baseFlight.from,
      to: baseFlight.to,
      date: baseFlight.date,
      price: newPrice,
      departureTime: depTime,
      arrivalTime: arrTime
    });
  }
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mmt_clone')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Flight.deleteMany({}); // Clear existing flights
    await Flight.insertMany(seedFlights);
    console.log(`Dummy flights seeded successfully! Inserted ${seedFlights.length} total flights.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding flights:', err);
    process.exit(1);
  });