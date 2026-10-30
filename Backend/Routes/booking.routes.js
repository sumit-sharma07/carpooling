const bookingController = require('../Controllers/booking.controller.js');
const isRiderToken = require('../Middlewares/isRiderToken.middleware.js')

const routes = (app) => {
    app.post('/cp/api/v1/bookings',isRiderToken, bookingController.createBooking);

    app.get('/cp/api/v1/bookings/:id',isRiderToken, bookingController.getById);
}

module.exports = routes;