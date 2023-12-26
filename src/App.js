// App.js

import React from 'react';
import {WeatherProvider} from './WeatherProvider';
import WeatherDisplay from './WeatherDisplay';

function App() {
  return (
    <div className="App">
      <WeatherDisplay />
    </div>
  );
}

const AppWithWeather = () => (
  <WeatherProvider>
    <App />
  </WeatherProvider>
);

export default AppWithWeather;
