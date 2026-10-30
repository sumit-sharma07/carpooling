import { memo } from 'react';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Main from '../userupdateform/Main';

const UpdateUser = () => {
  return (
    <>
        <Navbar/>
        <Main/>
        <Footer/>
    </>
  );
};

export default memo(UpdateUser);