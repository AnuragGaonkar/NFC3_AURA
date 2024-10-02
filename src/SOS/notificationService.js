import axios from 'axios';

// Replace with your actual endpoint
const notifyAuthoritiesUrl = 'https://<region>-<project-id>.cloudfunctions.net/notifyAuthorities';
const sendEmergencyNotificationUrl = 'https://<region>-<project-id>.cloudfunctions.net/sendEmergencyNotification'; // Replace with your actual endpoint

// Function to send coordinates to authorities
export const sendCoordinatesToAuthorities = async (data) => {
  try {
    const response = await axios.post(notifyAuthoritiesUrl, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('General Error:', error.message);
    }
    throw error;
  }
};

// Function to send emergency notification
export const sendEmergencyNotification = async (user, data) => {
  try {
    const response = await axios.post(sendEmergencyNotificationUrl, { ...data, user });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('General Error:', error.message);
    }
    throw error;
  }
};
