import './Main.css';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RideCard from '../../Components/RideCard.jsx';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Components/AlertContext.jsx';
import axios from 'axios';

const Main = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [rides, setRides ] = useState(null);
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pickup: '',
        drop: '',
        seats: '',
        time: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.get(`/cp/api/v1/rides/search?pickup=${formData.pickup}&drop=${formData.drop}&seats=${formData.seats}&time=${formData.time}`)
        .then( res=> {
            console.log(res.data.data);
            setLoading(false);
            setRides( res.data.data );
        })
        .catch( err=> {
            console.log(err.response);
            showAlert(`${err.response.data.err} `+`${err.response.data.message}`,'error');
            setLoading(false);
        })

    }
    const handleChange = (e) => {
        e.preventDefault();
        setFormData( (data) => {
            return { ...data, [e.target.name]: e.target.value };
        })
    }
  return (
    <div id="ride-container" className="background">
        <div id="ride-navigate-back" className='text'>
            <ArrowBackSharpIcon/>
            <span onClick={ () => navigate('/')}>Back</span>
        </div>
        <div id="ride-title" style={{marginBottom: '1rem'}} className="lg-title accent">Find your perfect ride</div>
        <div id="ride-subtitle" style={{marginBottom: '1.5rem'}} className="text text-secondary">Share rides, save money, and reduce your carbon footprint</div>
        <form id="ride-form" className='border heading'  onSubmit={ handleSubmit } >
            <label htmlFor='pickup'></label>
            <input id='pickup' name="pickup" type="text" placeholder='Pickup District name' value={formData.pickup} onChange={handleChange} required/><br/><br/>

            <label htmlFor='drop'></label>
            <input id='drop'  name="drop" type='text'placeholder='Drop District name' value={formData.drop} onChange={handleChange} required/><br/><br/>

            <label htmlFor='seats'></label>
            <input id='seats' name="seats" type='number'placeholder='No. of seats required' value={formData.seats} onChange={handleChange} min={1}/><br/><br/>

            <label htmlFor='time'></label>
            <input id='time' name="time" type='date' value={formData.time} onChange={handleChange} /><br/>

            <Button variant="contained" type='submit' loading={loading}
          loadingIndicator="Fetching rides ... Please wait" sx={{ width: '100%',padding:'1rem', margin:'1.5rem 0 0', borderRadius: '1rem'}} ><SearchIcon sx={{ marginRight: '0.5rem'}}/>Search Rides</Button>

        </form>

        { rides ?
            <div id="ride-output-section" className='border'>
                <div id="ride-output-labels">
                    <span className='sub-sec-title secondary'>Available Rides</span>
                    <p className='text text-secondary'>{rides.length} rides found</p>
                </div>
                <div id="ride-result">
                    { rides.map( ride => (
                        <RideCard rideData={ride}/>
                    ))}
                </div>
            </div>:
            ''
        }
    </div>
  );
};

export default Main;