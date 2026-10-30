const jwt = require('jsonwebtoken');
const { errorResponseBody } = require('../Utils/responseBody');
const User = require('../Models/user.model');


const verifyToken = async (req, res, next)=> {
    try {
        const token = req.headers.authorization;

        if(!token){
            errorResponseBody.err = 'Authentication Failed.';
            errorResponseBody.message = " Login first or create an account.";
            return res.status(400).json(errorResponseBody);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne( { email: decoded.email });
        console.log(user);

        req.user = user;
        next();
        
    } catch (err) {
        console.log(err);
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}


module.exports = verifyToken