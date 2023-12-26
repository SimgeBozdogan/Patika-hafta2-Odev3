import React from "react";

const WeatherCard = ({ day }) => {
  const iconCode = day.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  return (
    <div className="weather-card">
      <strong>
        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </strong>
      <img src={iconUrl} alt={day.weather[0].description} />
      <p>{day.weather[0].description}</p>
      <p>High: {day.temp.max}°C</p>
      <p>Low: {day.temp.min}°C</p>
    </div>
  );
};

export default WeatherCard;
