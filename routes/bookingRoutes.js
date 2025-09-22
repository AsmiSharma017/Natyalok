const express = require('express');
const router = express.Router();
const { readShows, writeShows } = require('../utils/fileHandler');

// View all shows
router.get('/shows', (req, res) => {
  const shows = readShows();
  res.render('shows', { shows });
});

// Book a ticket
router.post('/book/:id', (req, res, next) => {
  try {
    const shows = readShows();
    const show = shows.find(s => s.id === parseInt(req.params.id));
    if (!show) {
      const err = new Error('Show not found');
      err.status = 404;
      throw err;
    }
    res.json({ message: `Ticket booked for ${show.name} at ${show.theatre}` });
  } catch (error) {
    next(error); // Forward to error middleware
  }
});

module.exports = router;
