const mongoose = require('mongoose');

const phoneSpecSchema = new mongoose.Schema({
  cpu: { type: String, required: true },
  ramSize: String,
  storage: { type: String, required: true },
});

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  specs: phoneSpecSchema,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  available: { type: Boolean, required: true },
  image: { type: String, },
});

const phoneModel = mongoose.model('Phone', phoneSchema);

module.exports = { phoneModel };
