import { memo } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Main from './Main';

const UserProfile = () => {
  return (
    <>
      <Navbar/>
      <Main/>
      <Footer/>
    </>
  );
};

export default memo(UserProfile);