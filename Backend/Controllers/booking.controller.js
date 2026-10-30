const bookingService = require('../Services/booking.service.js');
const { successResponseBody, errorResponseBody } = require('../Utils/responseBody');

const createBooking = async (req, res)=> {
    try {
        const response = await bookingService.create( req.body );
        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);
    } catch (err) {
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message= err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        res.status(500).json(errorResponseBody);
    }
}

const getById = async(req, res)=> {
    try {
        const response = await bookingService.getBookingsById(req.params.id);
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createBooking,
    getById
}