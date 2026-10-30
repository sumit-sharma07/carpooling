const otpController = require('../Controllers/otp.controller.js');

const routes = (app)=> {

    app.post('/cp/api/v1/send-otp', otpController.createOtp);
    app.post('/cp/api/v1/verify-otp', otpController.verifyOtp);
}

module.exports = routes;