import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import SOSButton from './SOS/SOSButton'; 
import Map from './Map/Map';
import IncidentDetail from './Home/IncidentDetails';
import Report from './Report/Report';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/report" element={<Report />} />
                <Route path="/incident/:id" element={<IncidentDetail />} />
            </Routes>
            <SOSButton /> 
        </Router>
    );
}


export default App;
