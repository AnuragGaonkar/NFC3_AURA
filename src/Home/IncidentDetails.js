import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../Map/Map';
import './IncidentDetail.css';

const IncidentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incident = location.state?.incident;

  if (!incident) return <div>Loading...</div>;

  const mapCenter = [incident.Latitude, incident.Longitude];
  const markers = [{ position: mapCenter, popupText: incident.title }];

  return (
    <div className="incident-detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        &lt; Back
      </button>
      <div className="incident-header">
        <h1>{incident.title}</h1>
      </div>
      <div className="incident-content">
        <div className="incident-image-wrapper">
          <img src={incident.imageUrl} alt={incident.title} className="incident-image" />
        </div>
        <div className="incident-map">
          <Map center={mapCenter} markers={markers} />
        </div>
      </div>
      <div className="incident-description">
        <p><strong>Location:</strong> {incident.location}</p>
        <p><strong>Date:</strong> {incident.date}</p>
        <p>{incident.description}</p>
      </div>
    </div>
  );
};

export default IncidentDetail;
