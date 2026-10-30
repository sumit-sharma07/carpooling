const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
    required: true
  },

  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  duration: Number,
  distance: Number,
  seats: Number,
  cost: Number,

  status: {
    type: String,
    enum: {
        values: ["requested", "accepted", "rejected", "cancelled", "completed"],
        message: "Invalid booking status!"
    },
    default: "requested"
  },

  paymentStatus: {
    type: String,
    enum: {
        values: ["pending", "paid"],
        message: "Invalid payment status!"
    },
    default: "pending"
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking',bookingSchema);


module.exports = Booking;