import React from 'react';
import './SOSButton.css';

const SOSButton = () => {
    const handleClick = () => {
        // Implement chat or alert functionality here
        alert('SOS triggered!');
    };

    return (
        <div className="sos-button" onClick={handleClick}>
            <span className="sos-icon">S.O.S.</span>
        </div>
    );
};

export default SOSButton;
