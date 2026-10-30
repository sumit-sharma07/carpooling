import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/home/Home.jsx';
import Rides from './Views/rides/Rides.jsx';
import Ride from './Views/ride/Ride.jsx';
import RideForm from './Views/rideForm/RideForm.jsx';
import SignUp from './Views/signup/SignUp.jsx';
import Login from './Views/login/Login.jsx';
import UserProfile from './Views/profile/user/UserProfile.jsx';
import UpdateUser from './Views/profile/userupdateform/UpdateUser.jsx';



function App() {
    return (
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/rides' element={<Rides/>}/>
        <Route path='/rides/publish' element={<RideForm/>}/>
        <Route path='/rides/:id' element={<Ride/>}/>
        <Route path='/signup' element={ <SignUp/>}/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/users/:id/' element={<UserProfile/>}/>
        <Route path='/users/:id/form' element={<UpdateUser/>}/>
      </Routes>
    )
}

export default App
