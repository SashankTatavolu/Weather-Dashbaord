import React from 'react';

function WeatherDisplay({ weatherData }) {
  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      ) : (
        <p>No data available. Please search for a city.</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
