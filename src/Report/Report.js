import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Report.css';

const Report = () => {
  const [crimeType, setCrimeType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [longitude, setLongitude] = useState(''); 
  const [latitude, setLatitude] = useState('');
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      if (image) {
        const storageRef = ref(storage, `crime-reports/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'crimeReports'), {
        crimeType,
        description,
        location,
        dateTime,
        longitude,
        latitude,
        imageUrl,
      });

      // Show success notification
      setNotification('Submitted successfully!');

      // Clear form fields
      setCrimeType('');
      setDescription('');
      setLocation('');
      setDateTime('');
      setImage(null);
      setLongitude('');
      setLatitude('');
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(''), 3000);

    } catch (error) {
      console.error('Error submitting crime report: ', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="crime-report-form">
      <h2>Report a Crime</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="crimeType">Crime Type:</label>
          <input
            type="text"
            id="crimeType"
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <button type="submit">Submit Report</button>
      </form>

      {/* Notification Popup */}
      {notification && (
        <div className="notification-popup">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Report;
