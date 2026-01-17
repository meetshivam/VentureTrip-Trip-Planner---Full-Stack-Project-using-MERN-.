import { useEffect, useState } from 'react';
import { fetchWeather, getWeatherTheme } from '../services/weather';

export default function WeatherBanner({ trip }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!trip?.coordinates) return;

    fetchWeather(trip.coordinates.lat, trip.coordinates.lng)
      .then(data => {
        setWeather(data.current_weather);
        document.body.className =
          getWeatherTheme(data.current_weather.weathercode);
      });
  }, [trip]);

  if (!weather) return null;

  return (
    <div className="card" style={{ marginBottom: 30 }}>
      <h3>Current Weather in {trip.destination}</h3>
      <p>
        🌡 {weather.temperature}°C  
        &nbsp; | &nbsp;
        💨 {weather.windspeed} km/h
      </p>
    </div>
  );
}
