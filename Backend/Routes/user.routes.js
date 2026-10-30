const userController = require('../Controllers/user.controller.js');
const verifyToken = require('../Middlewares/verifyToken.middleware.js');

const routes = (app) => {
    app.post('/cp/api/v1/users/register', userController.register);

    app.post('/cp/api/v1/users/login', userController.login);

    app.get('/cp/api/v1/users/:id',verifyToken, userController.getUserById);

    app.get('/cp/api/v1/users/:id/bookings',verifyToken, userController.getAllBookings);

    app.get('/cp/api/v1/users/:id/rides',verifyToken, userController.getAllRides);
}

module.exports = routes;