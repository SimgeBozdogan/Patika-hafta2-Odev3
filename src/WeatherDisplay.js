import React from 'react';
import { useWeather } from './WeatherProvider';

const WeatherDisplay = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{weatherData.city.name} Weather Forecast</h1>
      <ul>
        {weatherData.list.map(day => (
          <li key={day.dt}>
            <strong>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}:</strong>
            Weather: {day.weather[0].description}, High: {day.temp.max}°C, Low: {day.temp.min}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
