const otpService = require('../Services/otp.service.js');
const { successResponseBody, errorResponseBody} = require('../Utils/responseBody');


const createOtp = async( req, res)=> {
    try {

        const response = await otpService.create( req.body );
        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);
        
    } catch (err) {
       if(err.err){
            errorResponseBody.err = err.err;
            if(err.message) errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        res.status(500).json(errorResponseBody);
    }
};

const verifyOtp = async (req, res)=> {
    try {
        const response = await otpService.verify( req.body );
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
        
    } catch (err) {
        console.log(err);
        if(err.err){
            errorResponseBody.err = err.err;
            if(err.message) errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createOtp,
    verifyOtp
}