import { memo } from 'react';

import './Main.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Button from '@mui/material/Button';
import OTP from '../../Components/OTP';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlert } from '../../Components/AlertContext';

const Main = () => {
    const navigate = useNavigate();

    const { showAlert } = useAlert();
    const [email, setEmail] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e)=> {
        setEmail([e.target.name] = e.target.value);
    }

    const handleGetOTP = async()=> {
        if (!email) {
            showAlert('Please enter the mail first!', "info");
            return;
        }
        setLoading(true);

        await axios.post('http://localhost:5050/cp/api/v1/send-otp',{email})
        .then(res=>{
            console.log(res);
            showAlert("OTP sent to this email successfully.", "success");
            if(res.status === 201 ){
                setShowOtp(true);
                setLoading(false);
            }
        })
        .catch(err=>{
            setLoading(false);
            console.log(err.response);
            if(err.response){
                if(err.response.data.err.code === 11000) showAlert("Your previous OTP is still Valid. Please try generating new OTP after some time.", "info");
                else if(err.response.status === 404) showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'info');
                else  showAlert(`${err.response.data.err} `+ `${err.response.data.message}`,'error');
            }
            else showAlert(`${err.response.data.message}`,'error');
        })

        
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
    }
    return (
        <div id='login-container'>
            <div id="login-navigate-back" className='text'>
                    <ArrowBackIcon sx={{ marginRight: '0.3rem' }}/>
                    <span onClick={ ()=> navigate('/')}>Back</span>
            </div>
                
            <div id="login-credentials">
                <p className='lg-title'> Welcome Back</p>
                <p className='text text-secondary'> Sign in to your account to continue</p>

                <div id="login-form" className='background'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email address</label>
                    <div className="login-form-input">
                        <EmailOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value= {email}
                            placeholder='you@example.com'
                            className='login-form-input-item'
                            onChange = {handleChange}
                            required
                        />
                    </div>
                
                    {/* <label htmlFor='password'>Password</label>
                    <div className="login-form-input">
                        <HttpsOutlinedIcon sx={{border:" 2px solid #e5e7eb", padding:'0.5rem', fontSize:' 2rem', color: '#6B7280', borderTopLeftRadius:'1rem', borderBottomLeftRadius:'1rem', borderRight: 'none'}}/>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Password here'
                            className='login-form-input-item'
                            required
                        />
                    </div> */}

                    
                    
                    { showOtp && 
                    
                    <div id="login-otp-input">
                        <p className='heading' style={{ marginTop: '2rem'}}>OTP</p>
                        <OTP email={email}/>
                        <center className='text text-secondary'>Enter the OTP sent to this email</center>
                    </div>

                    }


                    { !showOtp && <Button variant="contained" loading={loading}
          loadingIndicator="Please wait..." sx={{ width: '98%', marginTop: '2.5rem', borderRadius: '1rem', padding: '0.7rem', marginBottom: '1.5rem'}} onClick={handleGetOTP} type='submit' >Get OTP</Button> }
                    
                    <p className='text text-secondary' style={{ textAlign: 'center'}}> Don't have an account. Create one <Button variant="text" onClick={ ()=> navigate('/signup')}>Sign up</Button></p>
                </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Main);