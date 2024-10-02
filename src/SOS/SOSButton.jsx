import React, { useState, useEffect } from 'react';
import './SOSButton.css';
import { getAuth } from "firebase/auth";
import { db } from '../firebaseConfig'; // Adjust path if necessary
import { collection, query, where, getDocs } from "firebase/firestore";
import { useGeolocated } from "react-geolocated";

const SOSButton = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const { coords} = useGeolocated();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, [auth]);

    const handleClick = async () => {
        if (!coords) {
            alert('Unable to retrieve location.');
            return;
        }

        setLoading(true);
        try {
            const { latitude, longitude } = coords;
            if (user) {
                // User is logged in
                const userDocRef = collection(db, 'users');
                const q = query(userDocRef, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const emergencyNumber = userData.emergencyNumber;

                    // Send SOS to emergency number
                    await sendSMS(emergencyNumber, `SOS Alert! Location: ${latitude}, ${longitude}. Emergency!`);

                    alert('SOS sent to your emergency contact.');
                } else {
                    alert('User data not found.');
                }
            } else {
                // User is not logged in
                // Implement logic to determine nearest authorities
                await sendSOSToAuthorities(latitude, longitude);

                alert('SOS sent to nearest authorities.');
            }
        } catch (error) {
            console.error('Error sending SOS:', error);
            alert('Failed to send SOS.');
        } finally {
            setLoading(false);
        }
    };

    const sendSMS = async (phoneNumber, message) => {
        // Implement your SMS sending service here
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    };

    const sendSOSToAuthorities = async (latitude, longitude) => {
        // Implement your logic to send SOS to authorities
        console.log(`Sending SOS to authorities. Location: ${latitude}, ${longitude}`);
    };

    return (
        <div className="sos-button" onClick={handleClick} style={{ cursor: loading ? 'wait' : 'pointer' }}>
            <span className="sos-icon">{loading ? 'Sending...' : 'S.O.S.'}</span>
        </div>
    );
};

export default SOSButton;
