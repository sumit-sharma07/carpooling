import './Main.css';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import DirectionsWalkSharpIcon from '@mui/icons-material/DirectionsWalkSharp';
import StarsIcon from '@mui/icons-material/Stars';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useAlert } from '../../Components/AlertContext';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const { id } = useParams();
    const [rideData, setRideData] = useState('');
    const [bookingSeats, setBookingSeats] = useState(1);
    const userId = localStorage.getItem('user');
    const [loading,setLoading] = useState(false);

    const {showAlert} = useAlert();
    const navigate = useNavigate();

    const handleSeatChange = (e)=>{
        const seats = Number(e.target.value);
        setBookingSeats(seats);

    }
    const handleBooking = () => {

        setLoading(true);
        axios.post('http://localhost:5050/cp/api/v1/bookings',{
            cost: rideData.riderCost * bookingSeats,
            seats: bookingSeats,
            rider: userId,
            ride: id,
            distance: rideData.riderDistance,
            duration: rideData.riderDuration
        },{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res.data.data);
            setLoading(false);
            showAlert('Booking Created successfully! Receive OTP from the driver at the time of riding.','success');
            navigate(`/users/${userId}`)
        }).catch(err=>{
            console.log(err.response.data);
            setLoading(false);
            if(err.status == 404){
                showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'info');
                navigate('/login');

            }
            else showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'error');
            
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5050/cp/api/v1/rides/${id}`)
        .then(res=>{
            console.log(res.data.data);
            // riderDuration = riderDistance / ride.distance * ride.duration;
            setRideData(res.data.data);
        })
        .catch(err=>console.log(err));
    },[id])
  return (
    <div id="ride-details-container" className='background'>
        <div id="ride-details-navigate-back" className='text'>
            <ArrowBackSharpIcon/>
            <span onClick={ ()=> navigate('/rides')}>Back</span>
        </div>
        <div id="ride-details-card" className='border'>
            <div id="ride-details-card-title" className='heading'> Ride Details</div>
            <div id="ride-details-card-body">
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                        },
                    }}
                    >
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot color='primary' />
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <p className='sub-heading'>{rideData ? rideData.source.name: ''}</p>
                            <p className=' text text-secondary'>{rideData.departureTime}</p>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot color='secondary'/>
                        </TimelineSeparator>
                        <TimelineContent>
                            <p className='sub-heading'>{rideData ? rideData.destination.name: ''}</p>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
            <div id="ride-details-card-footer">
                <div className="ride-details-card-footer-item">
                    <DirectionsWalkSharpIcon/>
                    <p className='sub-sec-title'> { rideData.riderDistance}</p>
                    <p className='text text-secondary'>km Distance</p>
                </div>
                <div className="ride-details-card-footer-item">
                    <AccessTimeOutlinedIcon/>
                    <p className='sub-sec-title'> { rideData.riderDuration}</p>
                    <p className='text text-secondary'>hrs Duration</p>
                </div>
                <div className="ride-details-card-footer-item">
                    <PeopleAltIcon/>
                    <p className='sub-sec-title'> {rideData.availableSeats}</p>
                    <p className='text text-secondary'> Seats left</p>
                </div>
            </div>
        </div>

        <div id="driver-details-card" className='border'>
            <div id="driver-details-card-title" className='heading' >Driver</div>
            <div id="driver-details-card-user">
                <div id="driver-details-card-user-logo" className=' sub-sec-title border'>{rideData? rideData.driver.name[0]:''}</div>
                <div id="driver-details-card-user-info">
                    <p id="driver-details-card-user-name" className='sub-sec-title'>{rideData?rideData.driver.name:''}</p>
                    <div id="driver-details-card-user-trust">
                        <StarsIcon sx={{ color: '#F59E0B'}}/>
                        <span id="driver-details-card-user-rating" className='sub-heading'>{rideData? rideData.driver.rating: ''}</span>
                        <span className='text text-secondary'> ( {rideData ? rideData.driver.totalRides: ''} rides )</span>
                    </div>
                    <p id="driver-details-card-user-detail" className='text text-secondary'>Member since 2023</p>
                </div>
            </div>
            <div id="driver-details-card-model" className='border'>
                <FontAwesomeIcon icon="fa-solid fa-car-side" color='#6B7280' fontSize='1.7rem'/>
                <div id="driver-details-card-model-info">
                    <div id="driver-details-card-model-name" style={{marginBottom:'0.3rem'}}className='heading'>{rideData? rideData.driver.vehicle.model  || "Car Model name": ''}</div>
                    <div id="driver-details-card-model-detail" className='text text-secondary'>{rideData? rideData.driver.vehicle.info  || "your wonder car your luxury": ''}</div>
                </div>
            </div>
            <h2 className='heading'>Contact</h2><br/>
            <div className="driver-details-card-contact">
                <LocalPhoneIcon style={{marginRight:'0.3rem'}}/>
                <span className='sub-heading text-secondary'><i> +91 {rideData? rideData.driver.phone: ''}</i> </span>
                
            </div>
            <div className="driver-details-card-contact">
                <EmailIcon style={{marginRight:'0.3rem'}}/>
                <span className='sub-heading text-secondary'><i> {rideData? rideData.driver.email: ''}</i> </span>
                
            </div>

        </div>
        <div id="booking-details-card" className='border'>
                <div id="booking-details-title">
                    <div id="booking-details-title-price">
                        <p className='sub-sec-title'>Rs/_ { rideData.riderCost}</p>
                        <p className='text text-secondary'>per seat</p>
                    </div>
                    <div id="booking-details-title-seats">
                        <p className='text text-secondary'>Available</p>
                        <p className='sub-heading'>{rideData.availableSeats}  seats</p>
                    </div>
                </div>
                <div id="booking-details-select">
                    <select name='seats' value={bookingSeats} className='text' onChange={ handleSeatChange}>
                        {[...Array(rideData.availableSeats)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                        {i + 1} Seat
                        </option>
                    ))}
                    </select>
                </div>
                <div id="booking-details-footer">
                    <div id="booking-details-total">
                        <p className='text'>Total</p>
                        <p className='heading optimised-cost'>Rs/_ {rideData ? rideData.riderCost * bookingSeats : 0}</p>
                    </div>
                    <Button loading={loading}
          loadingIndicator="Creating Booking ..." variant="contained" sx={{ width: '100%', padding: '0.7rem 0'}} onClick={ handleBooking } >$ Book {bookingSeats} seats</Button>
                </div>
        </div>
    </div>
  );
};

export default Main;