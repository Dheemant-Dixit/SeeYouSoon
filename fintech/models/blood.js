const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
  'stock-symbol': {
    type: String,
    required: true,
  },
  'start-date': {
    type: Date,
    required: true,
  },
  'end-date': {
    type: Date,
    required: true,
  },
  sentiment: {
    type: Number,
    required: true,
  },
  ui: {
    type: String,
    required: true,
  },
});

const Blood = mongoose.model('Blood', bloodSchema);

module.exports = Blood;
