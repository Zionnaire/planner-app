import React, { useState } from 'react';

const LocationWidget = ({ location, onChange }) => {
  const [currentLocation, setCurrentLocation] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d9dd8b84349540fd8f2ea4cc5671564e`)
            .then((response) => response.json())
            .then((data) => {
              if (data.results.length > 0) {
                const address = data.results[0].formatted;
                setCurrentLocation(address);
                onChange(address);
              }
            })
            .catch((error) => {
              console.error('Error fetching location:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <input
        className="location-input"
        value={location || ''}
        placeholder="Location"
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={getCurrentLocation}>Get Current Location</button>
      {currentLocation && <p>Current Location: {currentLocation}</p>}
    </div>
  );
};

export default LocationWidget;





