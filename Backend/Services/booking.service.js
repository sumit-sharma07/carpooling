const Booking = require('../Models/booking.model.js');
const Ride = require('../Models/ride.model.js');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const create = async( data )=>{
    try {

        const{ ride, seats} = data;

        const rideData = await Ride.findById(ride).populate('driver');
        rideData.status = 'requested';
        rideData.availableSeats -= seats;
        await rideData.save();

        const generateOTP = () => {
            return otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        };

        const otp = generateOTP();
        rideData.startCode = otp;
        await rideData.save();
        console.log(otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL_USER}`,
                pass: `${process.env.EMAIL_PASSCODE}`
            }
        });
        
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to: rideData.driver.email,
            subject: otp,
            text: `Congratulations Driver!!! Your ride booked. Give this OTP cum Start Code to your rider while starting your ride. Your otp is ${otp}`
        });
        
        const booking = await Booking.create( data );
        return booking;

    } catch (err) {
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
            throw { err: error, message: 'Booking Validation Failed!', code: 400 }
        }
        throw err;
        
    }
}

const getBookingsById = async( id ) => {
    try {
        const bookings = await Booking.findById(id).populate('rider').populate('ride');
        return bookings;
    } catch (err) {
        console.log(err);
        throw err;
        
    }
}

module.exports = {
    create,
    getBookingsById
}