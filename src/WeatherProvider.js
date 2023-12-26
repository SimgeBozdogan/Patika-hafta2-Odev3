// WeatherProvider.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const cnt = 7;
  const initialCity = "Istanbul";
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (city) => {
      try {
        setLoading(true);
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        setWeatherData(weatherData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [apiKey, cnt]
  );

  useEffect(() => {
    // Fetch initial weather data for the default city (London)
    fetchData(initialCity);
  }, [fetchData]);

  const values = {
    weatherData,
    initialCity,
    loading,
    error,
    fetchData, // Include the fetchData function in the context
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
