import { memo, useState } from 'react';
import './Main.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Components/AlertContext';
import axios from 'axios';



const Main = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        carModel: '',
        carPlate: '',
        seats:'',
        password: '',
        role: 'rider'
    });

    const handleChange = (e) => {
        setFormData( (data) => {
            return { ...data, [e.target.name]: e.target.value };
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5050/cp/api/v1/users/register', formData)
        .then( res=>{
            console.log(res);
            showAlert("Registration successful.","success");
            navigate('/login');
        })
        .catch( err=>{
            if(err.response)showAlert("Email already exits.", "error");
        });
        setFormData({
            name: '',
            email: '',
            phone: '',
            carModel: '',
            carPlate: '',
            seats:'',
            password: '',
            role: 'rider'
        })
        
    }


  return (
    <div id='signup-main'>
        <div id="signup-navigate-back" className='text'>
                <ArrowBackIcon sx={{ marginRight: '0.3rem' }}/>
                <span onClick={ ()=> navigate('/')}>Back</span>
        </div>
        <div id='signup-container'>

            <div id="signup-choice">
                <p className='sub-sec-title'>Join RidePool</p>
                <p className='text text-secondary'>Choose how you want to use RidePool</p>
                <div id="signup-radio-grp">
                    <input
                        id='rider'
                        type='radio'
                        name='role'
                        value= 'rider'
                        checked={ formData.role === 'rider'}
                        onChange={ handleChange }

                    />
                    <label htmlFor='rider' className='border'>
                        <PersonIcon sx={{ marginRight: '1rem'}}/>
                        <div className="signup-radio-label-info">
                            <p className='heading'>I want to find Rides</p>
                            <p className='text text-secondary'>Join as a rider and find affordable rides to your destination</p>
                        </div>
                    </label>

                    <input
                        id='driver'
                        type='radio'
                        name='role'
                        value= 'driver'
                        checked={ formData.role === 'driver'}
                        onChange={ handleChange }

                    />
                    <label htmlFor='driver' className='border'>
                        <DirectionsCarIcon sx={{ marginRight: '1rem'}}/>
                        <div className="signup-radio-label-info">
                            <p className='heading'>I want to offer Rides</p>
                            <p className='text text-secondary'>Join as a driver and earn money by sharing your rides</p>
                        </div>
                    </label>
                    
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', borderTop: '2px solid #e5e7eb'}}>
                    <p className='text text-secondary'> Already have an account ?<Button variant="text" onClick={ ()=> navigate('/login')}>Login here</Button></p>
                </div>

                
            </div>

            <div id="signup-form" className='background'>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor='name'>Full name</label>
                    <div className="signup-form-input">
                        <PersonOutlineOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='name'
                            type='text'
                            name='name'
                            placeholder='Amitabh'
                            value= {formData.name}
                            onChange={ handleChange }
                            required
                        />
                    </div>

                    <label htmlFor='email'>Email address</label>
                    <div className="signup-form-input">
                        <EmailOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='you@example.com'
                            value= {formData.email}
                            onChange={ handleChange }
                            required
                        />
                    </div>
                    

                    <label htmlFor='phone'>Phone number</label>
                    <div className="signup-form-input">
                        <LocalPhoneOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem',  color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='phone'
                            type='tel'
                            name='phone'
                            placeholder='123-456-7890'
                            value= {formData.phone}
                            onChange={ handleChange }
                            required
                        />   
                    </div>
                    { formData.role === 'driver' && 
                        <>
                            <label htmlFor='carModel'>Car model</label>
                            <div className="signup-form-input">
                                <DirectionsCarOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem',  color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                                <input
                                    id='carModel'
                                    type='text'
                                    name='carModel'
                                    placeholder='Maruti Suzuki e Vitara'
                                    value= {formData.carModel}
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                            
                            <label htmlFor='carPlate'>License plate</label>
                            <div className="signup-form-input">
                                <ViewDayOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                                <input
                                    id='carPlate'
                                    type='text'
                                    name='carPlate'
                                    placeholder='XY00 1234'
                                    value= {formData.carPlate}
                                    onChange={ handleChange }
                                    required
                                />
                            </div>

                            <label htmlFor='seats'>Seats</label>
                            <div className="signup-form-input">
                                <AirlineSeatReclineNormalIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                                <input
                                    id='seats'
                                    type='Number'
                                    name='seats'
                                    value= {formData.seats}
                                    onChange={ handleChange }
                                    required
                                />
                            </div>
                        </>
                    
                    }
                    
                    <label htmlFor='password'>Create password</label>
                    <div className="signup-form-input">
                        <HttpsOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Create your password'
                            value= {formData.password}
                            onChange={ handleChange }
                            required
                        />
                    </div>

                    <Button variant="contained" sx={{ width: '98%', marginTop: '2.5rem', borderRadius: '1rem', padding: '0.7rem', marginBottom: '1.5rem'} } type='submit'>Create Account</Button>
                    
                </form>
            </div>
        
        </div>
    </div>
  );
};

export default memo(Main);