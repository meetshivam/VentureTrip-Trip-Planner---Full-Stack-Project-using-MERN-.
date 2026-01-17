export const fetchWeather = async (lat, lng) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`
  );
  return res.json();
};

export const getWeatherTheme = (code) => {
  if (code === 0) return 'clear';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return 'rain';
  if ([71, 73, 75, 77].includes(code)) return 'snow';
  return 'default';
};
