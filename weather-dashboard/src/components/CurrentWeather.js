import React from "react";

const CurrentWeather = ({ weather }) => {
    if (!weather) return null;

    return (
        <div>
            <h2>{weather.name}</h2>
            <p>{weather.date}</p>
            <img src={weather.icon} alt={weather.description} />
            <p>Temperature: {weather.temp}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.wind} m/s</p>
        </div>
    );
};

export default CurrentWeather;