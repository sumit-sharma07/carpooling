const Ride = require('../Models/ride.model.js');
const polyline = require('@mapbox/polyline');
const axios = require('axios');
const User = require('../Models/user.model.js');



const create = async( data ) =>{
    try {
        const { source, destination, availableSeats } = data;
        const res1 = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${source}&types=district&access_token=${process.env.MAP_APIKEY}`);
        const res2 = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${destination}&types=district&access_token=${process.env.MAP_APIKEY}`);

        sourceCoordinates = res1.data.features[0].geometry.coordinates;
        destinationCoordinates = res2.data.features[0].geometry.coordinates;

        console.log( sourceCoordinates, destinationCoordinates )

        const url = `https://router.project-osrm.org/route/v1/driving/${sourceCoordinates[0]},${sourceCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?overview=full&geometries=polyline`;
        const axiosRes = await axios.get(url);

        const route = axiosRes.data.routes[0];
        const routePoints = polyline.decode(route.geometry).map( ( [lat, lng] ) => (
            {
                lat,
                lng
            }
        ));

        const newData = {...data,
            source: {
                name: source,
                location: {
                    coordinates: sourceCoordinates
                }
            },
            destination: {
                name: destination,
                location: {
                    coordinates: destinationCoordinates
                }
            },
            routePoints,
            duration: route.duration,
            distance: route.distance,
            availableSeats: availableSeats[0]
        }
        const ride = await Ride.create(newData);
        return ride;
    } catch (err) {
        console.log(err.name);
        if(err.name === 'TypeError'){
            throw { err, message: 'Either source or destination might not be districts. Try some other nearest source or destination location.', code: 400 }; 
        }
        if(err.name === 'ValidationError') {
            let error = {};
            Object.keys(err.errors).forEach( key => {
                error[key] = err.errors[key].message;
            });
            throw { err: error, message: 'Ride Validation Failed!', code: 400 }
        }
        throw err;
    }
}


const getRidesBySearch = async (data)=> {
    try {

        let { pickup, drop, time, seats} = data ;

        const url1 = `https://api.mapbox.com/search/geocode/v6/forward?q=${pickup}&types=district&access_token=${process.env.MAP_APIKEY}`;
        const url2 = `https://api.mapbox.com/search/geocode/v6/forward?q=${drop}&types=district&access_token=${process.env.MAP_APIKEY}`;

        const res1 = await axios.get(url1);
        const res2 = await axios.get(url2);

        const data1 = res1.data.features[0].properties.coordinates;
        const data2 = res2.data.features[0].properties.coordinates;

        pickup = {
            lat : data1.latitude,
            lng : data1.longitude
        }
        drop = {
            lat : data2.latitude,
            lng : data2.longitude
        }

        // const rideTime = new Date(time);
        // console.log(rideTime);

        const rides = await Ride.find({
            // departureTime: {
            //     $gte: new Date(rideTime.getTime() - 30 * 60 * 1000),
            //     $lte: new Date(rideTime.getTime() + 30 * 60 * 1000)
            // },
            availableSeats: { $gte: seats },

            // use of geospatial index create in ride model

            // "source.location": {
            //     $near: {
            //         $geometry: {
            //         type: "Point",
            //         coordinates: [pickup.lng, pickup.lat]
            //         },
            //         $maxDistance: 5000
            //     }
            // }

        }).populate('driver');

        
        function getDistance(p1, p2) {
            const R = 6371000; // meters

            const lat1 = p1.lat * Math.PI / 180;
            const lat2 = p2.lat * Math.PI / 180;

            const dLat = lat2 - lat1;
            const dLng = (p2.lng - p1.lng) * Math.PI / 180;

            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(dLng / 2) ** 2;

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // meters
        }

        function isPointNearRoute(point, routePoints, threshold = 5000) {
            return routePoints.some(p => getDistance(point, p) <= threshold);
        }

        function findClosestPointIndex(point, routePoints) {
            let minDist = Infinity;
            let closestIndex = -1;

            for (let i = 0; i < routePoints.length; i++) {
                const dist = getDistance(point, routePoints[i]);

                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = i;
                }
            }

            return closestIndex;
        }

        // let pickupIndex = -1;
        // let dropIndex = -1;

        const matchedRides = rides.filter(ride =>{

            const pickupIndex = findClosestPointIndex(pickup, ride.routePoints);
            const dropIndex = findClosestPointIndex(drop, ride.routePoints);

            return isPointNearRoute(pickup, ride.routePoints) &&
            isPointNearRoute(drop, ride.routePoints) && ( pickupIndex < dropIndex );
            // && ( (ride.departureTime.getDate() === rideTime.getDate()) && (ride.departureTime.getMonth() === rideTime.getMonth()) && (ride.departureTime.getFullYear() === rideTime.getFullYear()) )
        });

        

        for (const ride of matchedRides){
            const pickupIndex = findClosestPointIndex(pickup, ride.routePoints);
            const dropIndex = findClosestPointIndex(drop, ride.routePoints);

            let riderDistance = 0;
            for (let i = pickupIndex; i < dropIndex; i++) {
                riderDistance += getDistance(
                ride.routePoints[i],
                ride.routePoints[i + 1]
            )};
            const riderDuration = riderDistance / ride.distance * ride.duration;
            ride.riderDistance = Math.round( (riderDistance / 1000) * 1e2 ) / 1e2;
            ride.riderDuration = Math.round( (riderDuration / 3600) * 1e2 ) / 1e2;
            ride.riderCost = Math.round((ride.pricePerKm * ride.riderDistance) * 100) / 100;

            await ride.save();

            // console.log( ' cost ' + ride.riderCost, ' distance ' + ride.riderDistance,' duration ' + ride.riderDuration );

        
        };

        return matchedRides.map( ride => {
            return {
                _id: ride._id,
                driver: ride.driver,
                source: ride.source,
                destination: ride.destination,
                totalDuration: ride.duration,
                totalDistance: ride.distance,
                costPerKm: ride.costPerKm,
                departureTime: ride.departureTime,
                totalCost: ride.riderCost,
                riderDuration: ride.riderDuration,
                riderDistance: ride.riderDistance,
                availableSeats: ride.availableSeats,
                totalSeats: ride.totalSeats,
                status: ride.status
            }
        });

        

    } catch (err) {
        console.log(err);
        if (err.code === 'ENOTFOUND'){
            throw {
                err: "No Internet Connection!",
                message: "Get Connected to internet or wifi",
                code: 500,

            }
        }
        else if( err.code === "ETIMEDOUT"){
            throw {
                err: "Timed out! No api response.",
                message: "Server not responding.",
                code: 500,
            }
        }
        else if( err.isAxiosError === true){
            throw{
                err: "Could not determine routes points.",
                message: "Mapbox api failed to respond.",
                code: 500,
            }
        }
        throw err;
        
    }
}

const getRideById = async(id)=> {
    try {
        const ride = await Ride.findById(id).populate('driver');
        if(!ride){
            throw{
                err: 'Ride not found!',
                message: "Ride not found!",
                code: 400
            }
        }
        return ride;

    } catch (err) {
        console.log(err);
        throw err;
        
    }
}


const verifyRideStartCode = async ( data )=> {
    try {
        const { rideId, userId, passengers, distance, riderCode, cost } = data;
        
        const ride = await Ride.findById(rideId);


        if(!ride){
            throw {
                err: 'Ride not found',
                code: 400
            }
        }
        console.log(ride);

        if(ride.startCode == riderCode){
            ride.status = 'ongoing';
            await ride.save();

            const user = await User.findById(userId);
            user.co2Saved += Math.round( (0.12 * distance * passengers) * 100 ) / 100;
            user.totalRides ++;
            user.costSpent += cost;
            
            const driver = await User.findById(ride.driver);
            driver.co2Saved += Math.round( (0.12 * distance * passengers) * 100 ) / 100;
            driver.totalRides ++;
            driver.costEarned += cost;

            await driver.save();
            await user.save();

            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        throw err;
        
    }
}

module.exports = {
    create,
    getRidesBySearch,
    getRideById,
    verifyRideStartCode
}