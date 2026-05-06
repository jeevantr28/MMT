require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Goa', 'Hyderabad'];
const airlines = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Go First', 'AirAsia India'];

// Helper to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to pad numbers
const pad = (num) => num.toString().padStart(2, '0');

// Generate flights for the next 30 days
const generateFlights = () => {
  const flights = [];
  const today = new Date();

  for (let i = 0; i < 200; i++) {
    // Random date within next 30 days
    const flightDate = new Date(today);
    flightDate.setDate(today.getDate() + Math.floor(Math.random() * 30));
    const dateString = `${flightDate.getFullYear()}-${pad(flightDate.getMonth() + 1)}-${pad(flightDate.getDate())}`;

    // Random from and to (ensure they are different)
    let from = getRandomItem(cities);
    let to = getRandomItem(cities);
    while (from === to) {
      to = getRandomItem(cities);
    }

    // Random times
    const departHour = Math.floor(Math.random() * 24);
    const departMin = Math.floor(Math.random() * 60);
    const flightDurationHours = Math.floor(Math.random() * 3) + 1; // 1 to 3 hours
    const flightDurationMins = Math.floor(Math.random() * 60);
    
    let arrivalHour = departHour + flightDurationHours;
    let arrivalMin = departMin + flightDurationMins;
    if (arrivalMin >= 60) {
      arrivalMin -= 60;
      arrivalHour += 1;
    }
    if (arrivalHour >= 24) arrivalHour -= 24;

    const formatTime = (h, m) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 === 0 ? 12 : h % 12;
      return `${pad(formattedH)}:${pad(m)} ${ampm}`;
    };

    flights.push({
      airline: getRandomItem(airlines),
      from,
      to,
      date: dateString,
      price: Math.floor(Math.random() * 8000) + 2000, // 2000 to 9999
      departureTime: formatTime(departHour, departMin),
      arrivalTime: formatTime(arrivalHour, arrivalMin)
    });
  }

  return flights;
};

const seedFlights = generateFlights();

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
