import './Navbar.css';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import logoImage from '../assets/images/logo-image.png'


import Alert from '@mui/material/Alert';
import { useAlert }from '../Components/AlertContext';


const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const { alert, showAlert } = useAlert();

    const userId = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    const handleLogout = ()=> {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login');
        showAlert("Logged out successfully. Hope you'll be back soon.", "success");
    }
    
    const handlePublish = () => {

        if(!userId || role !== 'driver') {

        showAlert("Login to your driver account first.","info");
        navigate('/login');
        }
        else {
        navigate('/rides/publish');
        }
    }

    useEffect(() => {
        if(userId){
            axios.get(`/cp/api/v1/users/${userId}`,{
                headers:{
                    authorization: localStorage.getItem('token')
                }
            })
            
            .then (res=>{
                setUser(res.data.data);
            })
            .catch (err=>{
                console.log(err.response.data);
            })
        }
    },[userId]);

  return (
    <>
        <div id='nav-container' className='border'>
            <div id="nav-logo" className='primary' onClick={()=> navigate('/')}>
                <DirectionsCarIcon sx={{ marginLeft: '2rem', borderRadius: '50%', padding: '0.5rem', fontSize:'2.3rem', backgroundColor: '#058adc'}} className='border secondary'/>
                
                <img  id="nav-logo-image" src={logoImage} alt='logo-image' className=''/>
        
                
            </div>
            <div id="nav-items">
                <Button variant="text" onClick={()=> navigate('/rides')}>Find Rides</Button>
                <Button variant="text" onClick={ handlePublish }>Offer Ride</Button>
                <Button variant="text">Know Us</Button>
                <Button variant="text">Features</Button>

            </div>
            { 
            user === '' ?
            <div id="nav-user">
                <Button variant="text" onClick={ ()=> navigate('/login')}>log in</Button>
                <Button variant="contained"sx= { { margin:'0 2rem 0 1rem'} } onClick={ ()=> navigate('/signup')}>sign up</Button>
            </div> : 
            <div id="nav-user-loggedin">
                <div id="nav-user-loggedin-icon" className='sub-sec-title' onClick = {()=>navigate(`/users/${user._id}`)}>
                    { user ? user.name[0]: ''}
                </div>
                <Button variant="text" sx={{ color:'#f04747', ":hover":{ backgroundColor: '#f0caca'}}} onClick={ handleLogout }>Logout</Button>
            </div>
            }  
        </div>

        { alert && <Alert variant="filled" severity={`${alert.type}`} sx={{ position: "sticky", top: '4.6rem'}}>
            { alert.message }
        </Alert>
        }

        
    </>
  );
};

export default Navbar;