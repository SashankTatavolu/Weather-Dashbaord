import React, { useState } from 'react';

function WeatherInput({ onSearch }) {
  const [city, setCity] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city); // Pass the entered city to the parent component
    setCity('');
  };

  return (
    <div  className="weather-input-container">
      <form onSubmit={handleSubmit}>
        <input
          className="weather-input"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="weather-submit-button" onClick={handleSubmit}>
      Get Weather
    </button>
      </form>
    </div>
  );
}

export default WeatherInput;
