import { memo, useState } from 'react';
import './Main.css';

import Button from '@mui/material/Button';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Components/AlertContext';
import axios from 'axios';

const Main = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        availableSeats: '1 seat',
        pricePerKm: '',
        departureTime: '',
        info: ''

    })

    const handleSubmit = (e)=> {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        axios.post('http://localhost:5050/cp/api/v1/rides', formData,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res);
            setLoading(false);
            showAlert("Ride published successfully.", "success");
            navigate('/rides');
        })
        .catch(err=>{
            setLoading(false);
            showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'error');
        })

    }

    const handleChange = (e)=> {
        e.preventDefault();
        
        setFormData( (data)=>{
            return { ...data, [e.target.name] : e.target.value}
        })
    }
  return (
    <div id='ride-form-container'>
        <div id="ride-form-navigate-back" className='text'>
            <ArrowBackSharpIcon/>
            <span onClick={ () => navigate('/')}>Back</span>
        </div>
        <div id="ride-form-header">
            <p id="ride-form-header-title" className='lg-title'>Offer a Ride</p>
            <p id="ride-form-header-subtitle" className='text text-secondary'>Share your journey and earn money</p>
        </div>

    <form onSubmit={handleSubmit}>
        <div id="ride-form-route" className='border'>
            <p className='sub-sec-title'>Route Details</p>
    
            <label htmlFor='source' className='sub-heading'> Start Location </label>
            <div className="ride-route-input">
                <LocationOnOutlinedIcon sx={{fontSize: '1.5rem', color: '#10B981', border: '2px solid #e5e7eb', padding: '0.7rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', borderRight: 'none'}} />
                <input type='text' id='source' name='source' onChange={handleChange} value={formData.source} required/>
            </div>

            <label htmlFor='destination' className='sub-heading'> Stop Location </label>
            <div className="ride-route-input">
                <LocationOnOutlinedIcon sx={{fontSize: '1.5rem',  color: '#f04747', border: '2px solid #e5e7eb', padding: '0.7rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', borderRight: 'none'}}/>
                <input type='text' id='destination' name='destination' onChange={handleChange} value={formData.destination} required/>
            </div>
            
        </div>

        <div id="ride-form-ridedetail" className='border'>
            <p className='ride-form-ridedetail-title sub-sec-title'>Ride Details</p>

            <div id="ride-form-layer1">
                <div className="ride-form-layer1-item">
                    <label htmlFor='seats' className='sub-heading'>Available Seats</label>
                    <div className="ride-form-layer1-input">
                        <PeopleAltIcon sx={{ fontSize: '1.5rem',  color: '#6B7280', border: '2px solid #e5e7eb', padding: '0.7rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', borderRight: 'none'}}/>
                        <select id='seats' className='text' name='availableSeats' onChange={handleChange} value={formData.availableSeats}  required>
                            <option>1 seat</option>
                            <option>2 seats</option>
                            <option>3 seats</option>
                            <option>4 seats</option>
                        </select>
                    </div>
                </div>

                <div className="ride-form-layer1-item">
                    <label htmlFor='pricePerKm' className='sub-heading'>Price Per Km</label>
                    <div className="ride-form-layer1-input">
                        <CurrencyRupeeOutlinedIcon sx={{ fontSize: '1.5rem',  color: '#6B7280', border: '2px solid #e5e7eb', padding: '0.7rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', borderRight: 'none'}}/>
                        <input id='pricePerKm' type='number' className='text' name='pricePerKm'  value={formData.pricePerKm} onChange={handleChange}  required/>
                
                    </div>
                </div>

                <div className="ride-form-layer1-item">
                    <label htmlFor='departureTime' className='sub-heading'>Departure Time</label>
                    <div className="ride-form-layer1-input">
                        <AccessTimeOutlinedIcon sx={{ fontSize: '1.5rem',  color: '#6B7280', border: '2px solid #e5e7eb', padding: '0.7rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', borderRight: 'none'}}/>
                        <input id='departureTime' type='datetime-local' className='text' name='departureTime' value={formData.departureTime} onChange={handleChange}  required/>
                    </div>
                </div>
            </div>

        </div>

        <div id="ride-form-additional-info" className='border'>
            <p className='sub-sec-title'>Additional Information</p>
            <p className='sub-heading text-secondary'>Notes for Passengers (Optional) </p>

            <textarea id='ride-form-textarea' className='text' name='info' onChange={handleChange} value={formData.info} ></textarea>
        </div>

        <Button color='secondary' loading={loading}
          loadingIndicator="Publishing ride..." variant="contained" sx={{ width:'100%', borderRadius:'1rem', height: '3.5rem' }} type='submit'>Publish Ride</Button>
    </form>
      
    </div>
  );
};

export default memo(Main);