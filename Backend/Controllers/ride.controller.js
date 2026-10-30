const rideService = require('../Services/ride.service.js');
const { successResponseBody, errorResponseBody } = require('../Utils/responseBody');

const createRide = async (req, res) => {
     try {
        const driver = req.user;
        const response = await rideService.create( {...req.body, driver} );
        successResponseBody.data = response;
        res.status(201).json(successResponseBody);
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

const getBySearch = async (req, res) => {
    try {
        const response = await rideService.getRidesBySearch( req.query );
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        console.log(err);
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message= err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        res.status(500).json(errorResponseBody);
        
    }
}

const getById = async (req, res) => {
    try {
        const response = await rideService.getRideById(req.params.id);
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message = err.message;
            return res.status(err.status).json(errorResponseBody);
        }

        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
        
    }
}

const verifyStartCode = async(req,res)=>{
    try{
        console.log(req.body);
        const response = await rideService.verifyRideStartCode( req.body );
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);

    }catch(err){
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message = err.message;
            return res.status(err.status).json(errorResponseBody);
        }

        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
        

    }
}


module.exports = {
    createRide,
    getBySearch,
    getById,
    verifyStartCode
}