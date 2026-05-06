require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

const seedFlights = [
  {
    airline: 'IndiGo',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-05-10',
    price: 4500,
    departureTime: '06:00 AM',
    arrivalTime: '08:15 AM'
  },
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
    airline: 'Vistara',
    from: 'Mumbai',
    to: 'Delhi',
    date: '2026-05-11',
    price: 6000,
    departureTime: '09:00 AM',
    arrivalTime: '11:15 AM'
  },
  {
    airline: 'SpiceJet',
    from: 'Bangalore',
    to: 'Chennai',
    date: '2026-05-11',
    price: 2500,
    departureTime: '14:00 PM',
    arrivalTime: '15:10 PM'
  },
  {
    airline: 'Go First',
    from: 'Delhi',
    to: 'Goa',
    date: '2026-05-15',
    price: 7000,
    departureTime: '11:00 AM',
    arrivalTime: '13:40 PM'
  },
  {
    airline: 'IndiGo',
    from: 'Mumbai',
    to: 'Goa',
    date: '2026-05-15',
    price: 3500,
    departureTime: '16:00 PM',
    arrivalTime: '17:20 PM'
  },
  {
    airline: 'AirAsia India',
    from: 'Chennai',
    to: 'Hyderabad',
    date: '2026-05-16',

    price: 3000,
    departureTime: '18:30 PM',
    arrivalTime: '19:45 PM'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mmt_clone')
.then(async () => {
  console.log('MongoDB connected for seeding...');
  await Flight.deleteMany({}); // Clear existing flights
  await Flight.insertMany(seedFlights);
  console.log('Dummy flights seeded successfully!');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error seeding flights:', err);
  process.exit(1);
});
