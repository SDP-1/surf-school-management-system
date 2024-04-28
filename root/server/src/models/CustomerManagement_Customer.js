// Customer Model (server side - Node.js with Mongoose)
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passport: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 1 // Default points set to 1
  },
  membershipLevel: {
    type: String,
    enum: ["Gold", "Silver", "Platinum"],
    default: "Silver"
  },
  image: {
    data: Buffer, // Image data stored as a Buffer
    contentType: String // Mime type of the image
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
