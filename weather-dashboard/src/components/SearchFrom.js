import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            console.log(`Searching for city: ${city}`);
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter city name'
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;