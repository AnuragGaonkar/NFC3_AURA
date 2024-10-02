import React from 'react';
import './ProfileSlideBar.css';

const ProfileSlideBar = ({ user, onClose }) => {
  return (
    <div className="profile-slide-bar">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="profile-info">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Emergency Number:</strong> {user.emergencyNumber || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default ProfileSlideBar;
