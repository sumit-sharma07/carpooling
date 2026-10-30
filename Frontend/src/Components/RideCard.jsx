import './RideCard.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import Button from '@mui/material/Button';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { useNavigate } from 'react-router-dom';

const RideCard = ( { rideData } ) => {
    const navigate = useNavigate();

    const handleView = ()=>{
        navigate(`/rides/${rideData._id}`)
    }
  return (
    <div id="ride-card">
        <div id="ride-card-header">
            <div id="ride-card-name">
                <div id="ride-card-logo" className='sub-sec-title border'> {rideData.driver.name.trim().toUpperCase()[0]}</div>
                <div id="ride-card-driver-detail">
                    <p className='heading'>{ rideData.driver.name.trim() }</p>
                    <p className='text-secondary'>{ rideData.driver.vehicle.model}</p>
                </div>
            </div>
            <div id="ride-card-price">
                <p className='sub-sec-title'>Rs/_ {rideData.totalCost}</p>
                <p className='text-secondary'>per seat</p>
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
                    <p className='text'>{ rideData.source.name }</p>
                    <p className=' text text-secondary'>{ rideData.departureTime }</p>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot color='secondary'/>
                </TimelineSeparator>
                <TimelineContent className='text'>{ rideData.destination.name }</TimelineContent>
            </TimelineItem>
            </Timeline>
        </div>
        <div id="ride-card-details" className='text text-secondary'>
            <span><PeopleAltIcon/> <span> {rideData.availableSeats} seats left</span> </span>
            <span><DirectionsWalkOutlinedIcon/> <span> {rideData.riderDistance} Km</span> </span>
            <span><AccessTimeOutlinedIcon/><span> {rideData.riderDuration} hrs. </span></span>
        </div>
        <Button variant="contained" color='secondary' sx ={ { margin:'2rem 0 1rem', width: '100%'} } onClick={ handleView }>View Ride <ArrowForwardIcon sx={{ marginLeft:'0.5rem'}}/></Button>
    </div>
  );
};

export default RideCard;