import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import logoImage from '../assets/images/logo-image.png';

import './Footer.css';

const Footer = () => {
  return (
    <div id="footer-container" className='sm-text'>
      <div id="footer-top">
        <div id="footer-top-left">
            <div id="footer-top-left-title"  className='sub-sec-title primary'>
                <DirectionsCarIcon sx={{borderRadius: '50%', padding: '0.5rem', fontSize:'2.3rem', marginRight:'0.5rem',  backgroundColor: '#058adc'}} className='border secondary' />
                <img  id="nav-logo-image" src={logoImage} alt='logo-image' className=''/>
            </div>
            <p>Making travel affordable, sustainable, and social for everyone.</p>
        </div>
        <div id="footer-top-right">
            <div>
                <div className='text' style={{marginBottom: '0.5rem'}}>Product</div>
                <p>Find Rides</p>
                <p>Offer Rides</p>
                <p>Pricing</p>
            </div>
            <div>
                <div className='text' style={{marginBottom: '0.5rem'}}>Company</div>
                <p>About Us</p>
                <p>Careers</p>
                <p>Press</p>
            </div>
            <div>
                <div className='text' style={{marginBottom: '0.5rem'}}>Support</div>
                <p>Help Center</p>
                <p>Safety</p>
                <p>Center</p>
            </div>
        </div>
      </div>
      <div id="footer-bottom">
        <p id="footer-bottom-left">2026 Smart Carpooling. All rights reserved.</p>
        <div id="footer-bottom-right">
            <GitHubIcon sx={{marginLeft: '1rem'}}/>
            <InstagramIcon sx={{marginLeft: '1rem'}}/>
            <TwitterIcon sx={{marginLeft: '1rem'}}/>
        </div>
      </div>
    </div>
  );
};

export default Footer;