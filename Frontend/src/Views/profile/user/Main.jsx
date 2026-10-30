import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import Button from '@mui/material/Button';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAlert } from '../../../Components/AlertContext';

import './Main.css';

const Main = () => {
    const navigate = useNavigate();
    const [verifiedRides, setVerifiedRides] = useState([]);
    const [otpState, setOtpState] = useState({});
    const inputsRef = useRef([]);

    const { id } = useParams();
    const [user,setUser] = useState('');
    const [rides, setRides] = useState([]);
    const [publishes, setPublishes] = useState([]);
    const [trip,setTrip] = useState(true);

    const {showAlert} = useAlert();

    const handleChange = (value, index, ride, passengers, distance, cost) => {
   
        const rideId = ride._id;

        const currentOtp = otpState[rideId] || ["","","","","",""];
        const newOtp = [...currentOtp];
        newOtp[index] = value;

        setOtpState(prev => ({
            ...prev,
            [rideId]: newOtp
        }));

        // Move to next input

        if (value && index < 5) {
            inputsRef.current[rideId]?.[index + 1]?.focus();
        }

        // If last box filled → trigger API
        if (index === 5 && value) {
            const finalOtp = newOtp.join("");

            axios.post(`http://localhost:5050/cp/api/v1/rides/start`,{
                rideId: ride._id,
                userId: id,
                passengers,
                distance,
                cost,
                riderCode: finalOtp
            },{
                headers:{
                    authorization: localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data.data) {
                    setVerifiedRides(prev => [...prev, rideId]);

                    axios.get(`http://localhost:5050/cp/api/v1/users/${id}`,{
                        headers:{
                            authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res=>{
                        // console.log(res);
                        setUser(res.data.data);
                    })
                    .catch(err=>{
                        if(err.response)console.log(err.response.data);
                    });

                    axios.get(`http://localhost:5050/cp/api/v1/users/${id}/bookings`,{
                        headers:{
                            authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        console.log(res.data.data);
                        setRides(res.data.data);
                    }).catch(err =>{
                        console.log(err.response);
                    });
                    
                    showAlert("Start code verification successful. The ride is ongoing now. Best of Luck!", 'success');
                } else {
                    showAlert("Start code verification failed. Verify the driver", 'error');
                }
            }).catch(err=>{
                console.log(err.response);
                showAlert("Start code verification failed. Some error occured",'error');
            });

        }


    };

    const handleKeyDown = (e, index, ride) => {
    if (e.key === "Backspace") {
        e.preventDefault();

        const rideId = ride._id;

        const currentOtp = otpState[rideId] || ["","","","","",""];
        const newOtp = [...currentOtp];

        if (currentOtp[index]) {
            newOtp[index] = "";
        } else if (index > 0) {
            newOtp[index - 1] = "";
            
            // move focus back
            inputsRef.current[rideId]?.[index - 1]?.focus();
        }

        setOtpState(prev => ({
            ...prev,
            [rideId]: newOtp
        }));
    }
};
    

    const handleTripClick = () => {
        setTrip(true);
    }
    const handlePublishClick = () => {
        console.log('rides rsponse');

        axios.get(`http://localhost:5050/cp/api/v1/users/${id}/rides`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res.data.data);
            setPublishes(res.data.data);
            setTrip(false);

        }).catch(err=>{
            console.log(err.response);
            showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'error');
        })
    }
    const handleLogout = ()=> {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
        showAlert("Logged out successfully. Hope you'll be back soon.", "success");
    }

    useEffect( ()=>{
        axios.get(`http://localhost:5050/cp/api/v1/users/${id}`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
            // console.log(res);
            setUser(res.data.data);
        })
        .catch(err=>{
            if(err.response)console.log(err.response.data);
        });

        axios.get(`http://localhost:5050/cp/api/v1/users/${id}/bookings`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data.data);
            setRides(res.data.data);
        }).catch(err =>{
            console.log(err.response);
            
        });

    },[id]);
    return (
        <div className='user-container'>
            <div className="user-navigate-back">
                <ArrowBackOutlinedIcon sx={{ marginRight: '0.5rem'}}/>
                <span className='text' onClick={()=> navigate('/')}>Back to Home</span>
            </div>

            <div className="user-personal-info border">
                <div className="user-info">
                    <div className="user-icon border lg-title">{user ? user.name[0]: ''}<span className='user-edit border background'><EditIcon/></span></div>
                    
                    
                    <div className="user-info-details">
                        <span className='sub-sec-title'> {user ? user.name: ''} </span>
                        <span className='user-role-info border text'>{user ? user.role: ''}</span>
                        <div className='user-email-info text text-secondary'><EmailOutlinedIcon sx={{ fontSize : '1rem', marginRight: '0.5rem'}}/> <p> {user ? user.email: ''}</p></div>
                        <div className='user-call-info text text-secondary'><CallOutlinedIcon sx={{ fontSize : '1rem', marginRight: '0.5rem'}}/><p> {user ? user.phone: ''} </p></div>
                        <div className="user-rating-info">
                            {user && user.role === 'driver' ? <><StarsIcon sx={{ color: '#F59E0B' }}/><span className='sub-heading'>{user.rating}</span></>: ''}
                        </div>
                    </div>
                </div>
                <div className="user-signout tertiary"  onClick={handleLogout}>
                    <LogoutIcon/>
                    <span> Sign out</span>
                </div>
            </div>

            <div className="user-counts">
                <div className="user-count-item border">
                    <p className='lg-title'>{user? user.totalRides : ''}</p>
                    <p className='text text-secondary'> Total Rides</p>
                </div>
                <div className="user-count-item border">
                    <p className='lg-title'>Rs/_ {user && user.role === 'driver'?  Math.round((user.costEarned) * 100 ) / 100 : (user.role === 'rider'? Math.round((user.costSpent) * 100 ) / 100 : '')} </p>
                    <p className='text text-secondary'> {user && user.role === 'driver'? "Total Earned": (user.role === 'rider'? "Total Spent": '')} </p>
                </div>
                <div className="user-count-item border">
                    <p className='lg-title'>{user? user.co2Saved || 0: ''}</p>
                    <p className='text text-secondary'>kg Co2 Saved</p>
                </div> 
                
            </div>
            {user && user.role === 'driver'? 
                
                <div className="user-item-vehicle">
                    <div className="user-count-item border">
                        <p className='heading'>{user ? user.vehicle.number || 'UP18 4548': ''}</p>
                        <p className='text'>Total Seats: {user ? user.vehicle.seats || 4 : ''}</p>
                        <p className='text text-secondary'>{user ? user.vehicle.model || "Maruti Suzuki e Vitara": ''}</p>
                    </div>
                </div>:
                ''
                }

                <span className='heading user-ride-search' onClick={handleTripClick}>Trips</span>
                { user && user.role === 'driver' && <span className='heading user-ride-search' style={{marginLeft: '1rem'}} onClick={handlePublishClick}> Publishes</span>}
                   {trip && rides ?
                        <div id="ride-output-section" className='border'>
                            <div id="ride-output-labels">
                                <span className='sub-sec-title secondary'>Booked Trips</span>
                                <p className='text text-secondary'>{rides.length} rides found</p>
                            </div>
                            <div id="ride-result">
                                { rides.map( r => (
                                    <div id="ride-card">
                                        <span className='ride-card-status border sub-heading secondary'>{r.ride.status.trim().toUpperCase()}</span>
                                        <div id="ride-card-header">
                                            <div id="ride-card-name">
                                                <div id="ride-card-logo" className='sub-sec-title border'> {user && user.role === 'rider' ? r.ride.driver.name.trim().toUpperCase()[0] : user && user.role === 'driver' ? r.rider.name.trim().toUpperCase()[0] : ""}</div>
                                                <div id="ride-card-driver-detail">
                                                    <p className='heading'>{user && user.role === 'rider' ? r.ride.driver.name.trim() : user && user.role === 'driver' ? r.rider.name.trim() : ""}</p>
                                                    <p className='text-secondary'>{user && user.role === 'rider' ? r.ride.driver.email.trim() : user && user.role === 'driver' ? r.rider.email.trim() : ""}</p>
                                                    <p className='text-secondary'>+91 {user && user.role === 'rider' ? r.ride.driver.phone : user && user.role === 'driver' ? r.rider.phone : ""}</p>
                                                </div>
                                            </div>
                                            <div id="ride-card-price">
                                                <div id="ride-card-price-container" style={{display:'flex', alignItems:'center'}}><CurrencyRupeeIcon/><span className='sub-sec-title'> {r.cost}</span></div>
                                                <center><p className='text-secondary'>Total cost</p></center>
                                            </div>
                                        </div>
                                        <div id="ride-card-body">
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
                                                    <p className='text'>{ r.ride.source.name }</p>
                                                    <p className=' text text-secondary'>{ r.ride.departureTime }</p>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                <TimelineDot color='secondary'/>
                                                </TimelineSeparator>
                                                <TimelineContent className='text'>{ r.ride.destination.name }</TimelineContent>
                                            </TimelineItem>
                                            </Timeline>
                                        </div>
                                        <div id="ride-card-info" className='text' style={{marginBottom: '2rem'}}><i>{r.ride.info}</i></div>
                                        {user && user.role === 'rider' && <div id="ride-card-name" style={{marginBottom:'2rem'}}>
                                            <div id="ride-card-logo" className='sub-sec-title border'><DirectionsCarFilledIcon/></div>
                                            <div id="ride-card-driver-detail">
                                                <p className='heading'>{r.ride.driver.vehicle.model}</p>
                                                <p className='text-secondary'>{r.ride.driver.vehicle.number}</p>
                                            </div>
                                        </div>}
                                        <div id="ride-card-details" className='text text-secondary'>
                                            <span><PeopleAltIcon/> <span> {r.seats} seats booked</span> </span>
                                            <span><DirectionsWalkOutlinedIcon/> <span> {r.distance} Km</span> </span>
                                            <span><AccessTimeOutlinedIcon/><span> {r.duration} hrs. </span></span>
                                            <span><CurrencyRupeeIcon/><span> {r.ride.pricePerKm} per km </span></span>
                                        </div>
                                        
                                        
                                        {user && user.role === 'rider' && !verifiedRides.includes(r.ride._id) && r.ride.status !== 'ongoing' && (
                                            <>
                                            <p style={{marginTop:'1.5rem'}} className='heading'>Start Code</p>
                                            <p style={{marginTop:'0.2rem'}} className='text text-secondary'>Enter the ride start code from the driver and build trust with him.</p>
                                            <div className='otp-container booking-otp-container'>
                                                {(otpState[r.ride._id] || ["","","","","",""]).map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        type='text'
                                                        maxLength={1}
                                                        value={digit}

                                                        ref={(el) => {
                                                            if (!inputsRef.current[r.ride._id]) {
                                                                inputsRef.current[r.ride._id] = [];
                                                            }
                                                            inputsRef.current[r.ride._id][index] = el;
                                                        }}

                                                        onChange={(e) => handleChange(e.target.value, index, r.ride, r.seats, r.distance, r.cost)}
                                                        onKeyDown={(e) => handleKeyDown(e, index, r.ride)}

                                                        className="otp-input"
                                                    />
                                                ))}
                                            </div>
                                            </>
                                        )}
                                        

                                    </div>
                                ))}
                            </div>
                        </div>:
                        (
                          user && user.role ==='driver' && publishes ?
                            <div id="ride-output-section" className='border'>
                            <div id="ride-output-labels">
                                <span className='sub-sec-title secondary'>Published Rides</span>
                                <p className='text text-secondary'>{publishes.length} rides found</p>
                            </div>
                            <div id="ride-result">
                                { publishes.map( ride => (
                                    <div id="ride-card">
                                        <div id="ride-card-header">
                                            <div id="ride-card-name">
                                                <div id="ride-card-logo" className='sub-sec-title border'> {ride.driver.vehicle.model.trim().toUpperCase()[0]}</div>
                                                <div id="ride-card-driver-detail">
                                                    <p className='heading'> {ride.driver.vehicle.model}</p>
                                                    <p className='text text-secondary'>{ ride.driver.vehicle.number }</p>
                                                    <p className='text text-secondary'>Total Seats: { ride.driver.vehicle.seats }</p>
                                                </div>
                                            </div>
                                            <div id="ride-card-price">
                                                <p className='sub-sec-title'><CurrencyRupeeIcon/>{ride.pricePerKm}</p>
                                                <p className='text-secondary'>per km</p>
                                            </div>
                                        </div>
                                        <div id="ride-card-body">
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
                                                    <p className='text'>{ ride.source.name }</p>
                                                    <p className=' text text-secondary'>{ ride.departureTime }</p>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                <TimelineDot color='secondary'/>
                                                </TimelineSeparator>
                                                <TimelineContent className='text'>{ ride.destination.name }</TimelineContent>
                                            </TimelineItem>
                                            </Timeline>
                                        </div>
                                        <div id="ride-card-info" className='text' style={{marginBottom: '2rem'}}><i>{ ride.info}</i></div>
                                        <div id="ride-card-details" className='text text-secondary'>
                                            <span><PeopleAltIcon/> <span> {ride.availableSeats} seats available</span> </span>
                                            <span><DirectionsWalkOutlinedIcon/> <span> {Math.round((ride.distance / 1000 ) * 100 ) / 100 } km</span> </span>
                                            <span><AccessTimeOutlinedIcon/><span> {Math.round((ride.duration / 3600 ) * 100 ) / 100 } hrs. </span></span>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>:
                            ''
                        )
                    }
        
        </div>
    );
};

export default Main;