const Booking = require('../Models/booking.model.js');
const Ride = require('../Models/ride.model.js');
const User = require('../Models/user.model.js');
const jwt = require('jsonwebtoken');

const signup = async (data) => {
    try{
        const { carModel, carPlate, seats } = data;

        const user = await User.create({ ...data, vehicle: { model: carModel, number: carPlate, seats: seats }});
        return user;

    }catch(err) {
        console.log(err);
        if(err.code === 11000){
            let error = {};
            Object.keys(err.keyValue).forEach( key => {
                error[key] = key + ' already exists.' 
            });
            throw { err: error, message: 'Duplicate keys found!', code: 400 }; 
        }
        if(err.name === 'ValidationError') {
            let error = {};
            Object.keys(err.errors).forEach( key => {
                error[key] = err.errors[key].message;
            });
            throw { err: error, message: 'User Validation Failed!', code: 400 }
        }
        throw err;

    }
}

const login = async (data) => {
    try {
        const { email, password } = data;

        const user = await User.findOne( { email });
        if(!user){
            throw { err: 'No user found! Try signing up', code: 400 };
        }

        const isMatch = user.password === password;
        if(!isMatch){
            throw { err: 'Invalid Credentials! Password Incorrect', code: 400 };
        }

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );
        
        return {
            user,
            token
        }

        
    } catch (err) {
        console.log(err);
        throw err;
        
    }
}

const getById = async ( id ) => {
    try {
        const user = await User.findById( id );
        if(!user){
            throw {
                err: 'User not found!',
                code: 400
            }
        }
        return user;
    } catch (err) {
        console.log(err);
        throw err;

    }
}

const getAllUserBookings = async ( userId )=> {
    try {
        const user = await User.findById(userId);
        if(!user){
            throw {
                err: 'User Not Found!',
                code: 404
            }
        }

        if(user.role === 'driver'){
            const rides = await Ride.find({ driver: userId }).select('_id');
            const bookings = await Booking.find({
                ride: { $in: rides.map(r => r._id) }
            }).populate('ride').populate('rider').populate({
                path: 'ride',
                populate: {
                path: 'driver'
                }
            });

            return bookings;
        }
        else {
            const bookings = await Booking.find( {rider: userId}).populate('ride').populate('rider').populate({
                path: 'ride',
                populate: {
                path: 'driver'
                }
            });
            
            return bookings;
        }
    } catch (err) {
        console.log(err);
        throw err;
        
    }
}

const getAllUserRides = async(userId) => {
    try {
        const user = await User.findById(userId);
        if(!user){
            throw {
                err: 'User Not Found!',
                code: 404
            }
        }

        if(user.role === 'rider'){
            throw {
                err: 'User is not a driver.',
                code: 400
            }
        }

        const rides = await Ride.find( { driver: userId }).populate('driver');
        return rides;
        
    } catch (err) {
        console.log(err);
        throw err;
        
    }
}

module.exports = {
    signup,
    login,
    getById,
    getAllUserBookings,
    getAllUserRides
}