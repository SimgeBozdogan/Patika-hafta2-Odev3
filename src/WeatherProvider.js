// WeatherProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const city = "London"; 
  const cnt = 7;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${apiKey}`;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(apiUrl);
        console.log('res: ', response)
        const weatherData = response.data;
        setWeatherData(weatherData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }

    fetchWeatherData();
  }, []);

  const values = {
    weatherData,
    loading,
    error,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather hook must be used within a WeatherProvider");
  }
  return context;
};
