import React, {useState} from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const API_Key = 'YOUR_OPENWEATHERMAP_API_KEY';
    const API_URL = 'https://api.openweathermap.org/data/3.0/weather';


    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: city,
                    appid: API_Key,
                    units: 'metric',
                },
            });
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setWeatherData(null);
            setError('City not found. Please enter a valid city name.');
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type='text'
                placeholder='Enter city name'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeatherData}>Get Weather</button>

            {error && <p>{error}</p>}

            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;