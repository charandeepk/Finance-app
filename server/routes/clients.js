const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// GET all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ startDate: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new client
router.post('/', async (req, res) => {
  const { name, amount, startDate } = req.body;
  try {
    const newClient = new Client({ name, amount, startDate });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a client by ID
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;