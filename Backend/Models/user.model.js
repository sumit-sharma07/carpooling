const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    phone: String,

    role: {
        type: String,
        enum: {
            values: ['driver', 'rider'],
            message: "role must be either 'driver' or 'rider'."
        },
        required: true,
        default: 'rider'
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    totalRides: {
        type: Number,
        default: 0
    },

    costSpent: {
        type: Number,
        default: 0
    },
    
    costEarned: {
        type: Number,
        default: 0
    },

    rating: {
        type: Number,
        default: 5
    },

    co2Saved: {
        type: Number,
        default: 0
    },

    vehicle: {
        model: String,
        number: String,
        seats: Number
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;