const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user.routes.js');
const rideRoutes = require('./Routes/ride.routes.js');
const bookingRoutes = require('./Routes/booking.routes.js');
const optRoutes = require('./Routes/otp.routes.js');
const { successResponseBody } = require('./Utils/responseBody.js');

const env = require('dotenv');
const cors = require('cors');

env.config();

const app = express();

// app.use(cors());
app.use(cors({
    origin: ["http://localhost:5173", "https://carpooling-pi.vercel.app"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


userRoutes(app);
rideRoutes(app);
bookingRoutes(app);
optRoutes(app);


app.use('/',(req, res)=> {
    successResponseBody.data = { message: 'Page Not Found!'};
    res.status(400).json(successResponseBody);
})



// app.listen('5050', () => {
//     console.log("Server started successfully on port 5050.");
const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started successfully on port ${PORT}.`);
    // connect to database
    // mongoose.connect('mongodb://127.0.0.1:27017/Carpooling',{ autoIndex: true })
    // .then(console.log('Connected to mongoDb database successfully.'))
    // .catch(err => console.log(err));
   
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

});