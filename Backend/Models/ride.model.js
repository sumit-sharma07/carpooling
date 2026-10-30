const mongoose = require('mongoose');

const rideSchema = mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    source: {
        name: String,
        location: {
            type: { type: String, default: 'Point' },
            coordinates: [Number]
        }
    },
    destination: {
        name: String,
        location: {
            type: { type: String, default: 'Point' },
            coordinates: [Number]
        }
    },
    routePoints: [
        {
            lat: Number,
            lng: Number
        }
    ],
    distance: Number, // in meters
    duration: Number, // in seconds

    departureTime: Date,
    availableSeats: Number,
    totalSeats: Number,
    pricePerKm: Number,

    startCode: Number,

    info: String,

    status: {
        type: String,
        enum: {
            values: ['scheduled','requested','ongoing','completed','canceled'],
            message: 'Invalid ride status!'
        },
        default: 'scheduled'
    },
    riderDistance: Number,
    riderDuration: Number,
    riderCost: Number

}, { timestamps: true });

rideSchema.index({ "source.location": "2dsphere" });

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;