// utils.ts

// Utility functions and interfaces for the weather app

// Location data interface
export interface LocationData {
  latitude: number;
  longitude: number;
}

// Weather data interface
export interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      message?: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  
  // Convert temperature from Kelvin to Fahrenheit
  export const convertKelvinToFahrenheit = (kelvin: number): string => {
    const celsius = kelvin - 273.15;
    const fahrenheit = (celsius * (9 / 5)) + 32;
    return fahrenheit.toFixed(2);
  };
  
  // Determine whether to wear a jacket based on temperature and weather condition
  export const shouldWearJacket = (weatherData: WeatherData): boolean => {
    const fahrenheitTemp = parseFloat(convertKelvinToFahrenheit(weatherData.main.temp));
    const windSpeed = weatherData.wind.speed; // Wind speed in meters/sec
    const humidity = weatherData.main.humidity; // Humidity percentage
  
    const coldTemperatureThreshold = 59; // Fahrenheit
    const windSpeedThreshold = 10; // Meters/sec
    const highHumidityThreshold = 80; // Percent
  
    const conditionsRequiringJacket = ['Rain', 'Snow', 'Thunderstorm'];
    const currentWeatherCondition = weatherData.weather[0].main;
  
    const isCold = fahrenheitTemp < coldTemperatureThreshold;
    const isWindy = windSpeed > windSpeedThreshold;
    const isHighHumidity = humidity > highHumidityThreshold;
    const isBadWeather = conditionsRequiringJacket.includes(currentWeatherCondition);
  
    // Logic to determine if a jacket is needed
    if (isCold || isWindy || isHighHumidity || isBadWeather) {
      return true;
    }
  
    return false;
  };
  
  