// WeatherService.ts

const API_KEY = 'a0da3df89b7b2464a325aa449a7a2674';

const fetchWeatherData = async (lat: string, long: string) => {
  //const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`; 
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Rethrow for handling in the component
  }
};

export default fetchWeatherData;