const jwt = require('jsonwebtoken');
const { errorResponseBody } = require('../Utils/responseBody');
const User = require('../Models/user.model');


const isDriverToken = async (req, res, next)=> {
    try {
        const token = req.headers.authorization;

        if(!token){
            errorResponseBody.err = 'Authentication Failed.';
            errorResponseBody.message = " Login to your driver account first.";
            return res.status(404).json(errorResponseBody);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne( { email: decoded.email });
        console.log(user);
        if(user.role !== 'driver'){
            errorResponseBody.err = 'Authorization Failed.';
            errorResponseBody.message = " Login to your driver account.";
            return res.status(404).json(errorResponseBody);
        }

        req.user = user;
        next();
        
    } catch (err) {
        console.log(err);
        errorResponseBody.err = err;
        showAlert("Its not you its us.", "error");
        return res.status(500).json(errorResponseBody);
    }
}


module.exports = isDriverToken