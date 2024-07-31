import React from "react";

const WeatherCard = ({ weather }) => {
    return (
        <div>
            <h3>{weather.date}</h3>
            <img src={weather.icon} alt={weather.description} />
            <p>Temperature: {weather.temp}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>Wind Speed: {weather.wind}</p>
        </div>
    );
};

export default WeatherCard;