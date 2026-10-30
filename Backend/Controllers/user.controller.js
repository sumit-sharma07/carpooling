const userService = require('../Services/user.service.js');
const { successResponseBody, errorResponseBody } = require('../Utils/responseBody.js');

const register  = async (req, res) => {
    try {
        const response = await userService.signup( req.body );
        successResponseBody.data = response;
        res.status(201).json(successResponseBody);

    } catch(err){
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message= err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        res.status(500).json(errorResponseBody);
    }
}

const login = async (req, res) => {
    try {
        const response = await userService.login( req.body );
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
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

const getUserById = async(req, res) => {
    try {
        const response = await userService.getById( req.params.id);
        successResponseBody.data = response;
        res.status(200).json(successResponseBody);
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

const getAllBookings = async(req, res)=> {
    try {
        const response = await userService.getAllUserBookings(req.params.id);
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message= err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
        
    }
}

const getAllRides = async (req,res)=>{
    try {
        const response = await userService.getAllUserRides( req.params.id);
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        if(err.err){
            errorResponseBody.err = err.err;
            errorResponseBody.message= err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
        
    }
}

module.exports = {
    register,
    login,
    getUserById,
    getAllBookings,
    getAllRides
}