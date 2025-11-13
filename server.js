const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Registration = require('./models/Registration');

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// 🧾 POST route (register)
app.post('/api/register', async (req, res) => {
  try {
    const data = new Registration(req.body);
    await data.save();
    res.json({ message: 'Registration saved!', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 GET route (list all registrations)
app.get('/api/registrations', async (req, res) => {
  const list = await Registration.find();
  res.json(list);
});

// 🗑 DELETE route
app.delete('/api/registrations/:id', async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted!' });
});

// ✏️ UPDATE route
app.put('/api/registrations/:id', async (req, res) => {
  const updated = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🚀 Server start
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
