import { memo, useState } from 'react';
import './Main.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';



const Main = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        carModel: '',
        carPlate: '',
        password: '',
        role: 'rider'
    });

    const handleChange = (e) => {
        setFormData( (data) => {
            console.log( e.target.value);
            return { ...data, [e.target.name]: e.target.value };
        })
    }
  return (
    <div id='edit-main'>
        <div id="edit-navigate-back" className='text'>
                <ArrowBackIcon sx={{ marginRight: '0.3rem' }}/>
                <span onClick={ ()=> navigate('/')}>Back</span>
        </div>

        <center><p className='lg-title'> Edit Details </p></center>
        
        <div id='edit-container'>
            <div id="edit-form" className='background'>
                <label htmlFor='name'>Full name</label>
                <div className="edit-form-input">
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
                <div className="edit-form-input">
                    <EmailOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                    <input
                        id='email'
                        type='text'
                        name='email'
                        placeholder='you@example.com'
                        value= {formData.email}
                        onChange={ handleChange }
                        required
                    />
                </div>
                

                <label htmlFor='phone'>Phone number</label>
                <div className="edit-form-input">
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
                        <div className="edit-form-input">
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
                        <div className="edit-form-input">
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
                    </>
                
                }
                
                <label htmlFor='password'>Change password</label>
                <div className="edit-form-input">
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

                <Button variant="contained" sx={{ width: '98%', marginTop: '2.5rem', borderRadius: '1rem', padding: '0.7rem', marginBottom: '1.5rem'}}>Confirm</Button>
                
            </div>
        
        </div>
    </div>
  );
};

export default memo(Main);