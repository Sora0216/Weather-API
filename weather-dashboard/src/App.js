import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchForm from "./components/SearchFrom";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import './App.css';

const API_KEY = "cb9195c2a239983b0d8e606ce9ddc55e";

const App =() => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const fetchWeather = async (city) => {
    try {
      console.log(`Fetching weather for city: ${city}`);
      const geoResponse = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=cb9195c2a239983b0d8e606ce9ddc55e`"
      );
      console.log(`GeoResponse:`, geoResponse);

      if(geoResponse.data.length === 0) {
        console.error('No geographical data found for the city');
        return;
      }

      const { lat, lon } = geoResponse.data[0];

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cb9195c2a239983b0d8e606ce9ddc55e`
      );
      console.log('WeatherResponse:', weatherResponse);
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=cb9195c2a239983b0d8e606ce9ddc55e`
      );
      console.log('ForecastResponse:', forecastResponse);

      const weatherData = {
        name: weatherResponse.data.name,
        date: new Date().toLocaleDateString(),
        icon: `https://openweathermap.org/img/wn/${weatherResponse.data.weather[0].icon}.png`,
        description: weatherResponse.data.weather[0].description,
        temp: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
        wind: weatherResponse.data.wind.speed,
      };

      const forecastData = forecastResponse.data.list.map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        description: item.weather[0].description,
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      }));

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setHistory((prevHistory) => [...new Set([city, ...prevHistory])]);
      localStorage.setItem('history', JSON.stringify([...new Set([city, ...history])]));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <div className="header">Weather Dashboard</div>
      <div className="container">
        <div className="search-bar">
        </div>
      </div>
      <SearchForm onSearch={fetchWeather} />
      <CurrentWeather weather={currentWeather} />
      <Forecast forecast={forecast} />
      <ul>
        {history.map((city, index) => (
          <li key={index} onClick={() => fetchWeather(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
