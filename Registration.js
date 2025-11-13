const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  department: String,
  roll: String,
  phone: String,
  email: String,
  paymentMethod: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
