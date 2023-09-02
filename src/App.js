import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import Globe from './components/Globe';
import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      // Use the entered city name in the API URL
      const apiKey = '90afb922160f62baa77b6bd2dc2b4e70'; // Replace with your API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      
      // Make the API request using fetch
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // temperatureInCelsius = temperatureInKelvin - 273.15;

  
      // Update the weatherData state with the fetched data
      setWeatherData({
        city: data.name,
        temperature : (data.main.temp - 273.15).toFixed(2),

        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        condition: data.weather[0].description,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      // Handle errors and set weatherData to null or an error state
      setWeatherData(null);
    }
  };
  

  return (
    <div className="App">
      <h1>Weather Station Dashboard</h1>
      <WeatherInput onSearch={fetchWeatherData} />
      <WeatherDisplay weatherData={weatherData} />
      <Globe />
    </div>
  );
}

export default App;
