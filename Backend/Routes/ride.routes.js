const rideController = require('../Controllers/ride.controller');
const verifyToken = require('../Middlewares/verifyToken.middleware');
const isDriverToken =  require('../Middlewares/isDriverToken.middleware');
const isRiderToken = require('../Middlewares/isRiderToken.middleware');

const routes = (app)=>{
    // create a ride
    app.post('/cp/api/v1/rides',isDriverToken,rideController.createRide);

    app.post('/cp/api/v1/rides/start',isRiderToken,rideController.verifyStartCode);

    // get ride by search
    app.get('/cp/api/v1/rides/search',rideController.getBySearch);

    // get ride by id
    app.get('/cp/api/v1/rides/:id', rideController.getById);

}

module.exports = routes;