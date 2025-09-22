// CommonJS module system
const express = require('express');
const path = require('path');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});
app.use('/', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', { error: err });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Run server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Natyalok server running on http://localhost:${PORT}`);
});
