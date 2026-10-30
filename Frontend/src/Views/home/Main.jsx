import './Main.css';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Components/AlertContext';

const Main = () => {
  const { showAlert } = useAlert();


  const handlePublish = () => {
    const userId = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if(!userId || role !== 'driver') {

      showAlert("Login to your driver account first.","info");
      navigate('/login');
    }
    else {
      navigate('/rides/publish');
    }
  }
  const navigate = useNavigate();
  return (
    <div id='home'>
        <div id="hero-section">
        </div>
        <div id="hero-section-curtain">
          <div id="hero-section-content">
              <p id="hero-title" className='pg-title accent'>Share rides, save money and make friends.</p>
              <p className='text surface'> Join millions of travelers sharing rides daily. Cut costs, reduce emissions, and connect with fellow commuters on your route.</p>
              <div id="hero-navigation">
                <Button variant="contained" sx={{ padding: '1rem 1rem 1rem 2rem',borderRadius:'2rem', marginRight:'4rem'}} onClick={()=> navigate('/rides')}>Find a ride<ArrowForwardIcon sx={{ marginLeft:'0.5rem'}}/> </Button>
                <Button variant="outlined" sx={{ padding: '1rem 2rem',borderRadius:'2rem', color:'white',borderColor:'#bcbcbe', ":hover":{color:'white',borderColor:'white'}}} onClick={ handlePublish }>Offer a ride<DirectionsCarIcon sx={{ marginLeft:'0.5rem'}}/> </Button>
              </div>
          </div>
        </div>
     
    </div>
  );
};

export default Main;