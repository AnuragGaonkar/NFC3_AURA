import React, { useEffect } from 'react';
import L from 'leaflet';
import './Map.css';

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([19.076, 72.8777], 13); // Mumbai coordinates
    
    // Add a tile layer to the map with attribution
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add a marker with popup
    const marker = L.marker([19.076, 72.8777]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    // Add a circle with popup
    const circle = L.circle([19.076, 72.8777], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500 // Radius in meters
    }).addTo(map);
    circle.bindPopup("I am a circle.");

    // Add a standalone popup
    const popup = L.popup()
      .setLatLng([19.086, 72.8777])
      .setContent("I am a standalone popup.")
      .openOn(map);

    // Handle map click events
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);

    // Geolocation functionality
    function onSuccess(pos) {
      const { latitude, longitude, accuracy } = pos.coords;
      // Add marker for current location
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup("<b>You are here!</b>")
        .openPopup();
      
      // Add circle around current location
      L.circle([latitude, longitude], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.2,
        radius: accuracy
      }).addTo(map);
      
      // Center the map on the current location
      map.setView([latitude, longitude], 13);
    }

    function onError(err) {
      if (err.code === 1) {
        alert("Please allow geolocation access.");
      } else {
        alert("Cannot get current location.");
      }
    }

    // Watch for position changes
    navigator.geolocation.watchPosition(onSuccess, onError);

    // Cleanup function to remove the map instance
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <h1>Crime Heat Map</h1>
      <div id="map" style={{ height: '90vh', width: '100%' }}></div>
    </>
  );
};

export default Map;
