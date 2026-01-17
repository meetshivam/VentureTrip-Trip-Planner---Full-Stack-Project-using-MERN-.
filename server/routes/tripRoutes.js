const express = require('express');
const Trip = require('../models/Trip');

const router = express.Router();

// CREATE trip
router.post('/', async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE trip
router.delete('/:id', async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: 'Trip deleted' });
});

module.exports = router;
