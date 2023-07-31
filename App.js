import React, { useState, useEffect } from "react";
import getWeatherData from "./weather";

const cities = ["Hyderabad", "Rajahmundry", "Lucknow", "Raipur"];

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const fetchWeatherData = (city) => {
    getWeatherData(city)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <br />
      {weatherData ? (
        <p data-testid="weather-result">{`${weatherData.description}, ${weatherData.temp}°C (Max ${weatherData.temp_max}, Min ${weatherData.temp_min})`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
