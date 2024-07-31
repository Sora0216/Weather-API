import React from "react";
import WeatherCard from './WeatherCard';

const Forecast = ({ forecast }) => {
    if (!forecast) return null;

    return (
        <div>
            {forecast.map((day, index) =>(
                <WeatherCard key={index} weather={day} />
            ))}
        </div>
    );
};

export default Forecast;