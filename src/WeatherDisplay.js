// WeatherDisplay.js
import React, { useState } from "react";
import { useWeather } from "./WeatherProvider";
import WeatherCard from "./WeatherCard";
import cities from "./cityData";

const WeatherDisplay = () => {
  const { weatherData, initialCity, loading, error, fetchData } = useWeather();
  const [selectedCity, setSelectedCity] = useState(initialCity);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    // Fetch weather data for the selected city
    fetchData(newCity);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <label htmlFor="citySelect">Select a City: </label>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="weather-cards-container">
        {weatherData.list.map((day) => (
          <WeatherCard key={day.dt} day={day} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
