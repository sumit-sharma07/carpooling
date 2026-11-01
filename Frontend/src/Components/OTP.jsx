import { useRef } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAlert }from './AlertContext';

import './OTP.css';

const OTP = ({ email }) => {

    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [otp, setOtp] = useState(["","","","","",""]);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
   
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }

        // If last box filled → trigger API
        if (index === 5 && value) {
        const finalOtp = newOtp.join("");

        axios.post('/cp/api/v1/verify-otp',{ email, otp: finalOtp})
        .then( res=> {
            console.log(res);
            localStorage.setItem('token',res.data.data.token);
            localStorage.setItem('user', res.data.data.user._id);
            localStorage.setItem('role', res.data.data.user.role);
            showAlert(`Welcome back ${res.data.data.user.name}. You have logged in successfully.`, "success");
            navigate('/');
        })
        .catch( err=> {
            if(err.response){
                showAlert(`${err.response.data.err}` + ` ${err.response.data.message}`, 'error');
            }
        })

        }
    };

    const handleKeyDown = (e, index) => {
        // Move back on backspace
        if (e.key === "Backspace") {
            e.preventDefault();

            const newOtp = [ ...otp ];
            if(otp[index]){
                newOtp[index] = "";
                setOtp(newOtp);
            }else if( index > 0) {
                newOtp[index-1] = "";
                setOtp(newOtp);
                inputsRef.current[index-1].focus();
            }
        }
    };
 
  return (
    <div className='otp-container'>
      {otp.map( (digit, index) => (
        <input
            key={index}
            type='text'
            maxLength={1}
            value={digit}
            ref= {(el)=> (inputsRef.current[index] = el)}
            onChange = { (e) => handleChange(e.target.value, index)}
            onKeyDown={ (e) => handleKeyDown(e, index)}
            className="otp-input"
        />
      ))}
    </div>
  );
};

export default memo(OTP);