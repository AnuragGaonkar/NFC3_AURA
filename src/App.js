import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import SOSButton from './SOS/SOSButton'; 
import Map from './Map/Map';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
            <SOSButton /> 
        </Router>
    );
}

export default App;


const Updates = () => <div>Updates Page</div>;
const SignIn = () => <div>Sign In Page</div>;
