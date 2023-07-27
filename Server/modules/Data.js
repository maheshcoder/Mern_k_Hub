const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: Number, required: true },
  // Add other fields as required
});

module.exports = mongoose.model('Data', dataSchema);
