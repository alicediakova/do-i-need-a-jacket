//App.tsx

import React, { useEffect, useState, CSSProperties } from 'react';
import fetchWeatherData from './services/WeatherService';
import { WeatherData, convertKelvinToFahrenheit, shouldWearJacket,LocationData} from './utils/utils';
import { fetchCurrentLocation } from './services/LocationService';


export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const getWeatherData = async () => {
        setIsLoading(true);

      try {
        const location: LocationData | null = await fetchCurrentLocation();

        if (location) {
          const data = await fetchWeatherData(location.latitude.toString(), location.longitude.toString());
          setWeatherData(data);
        } else {
          setError('Location data not available');
        }
      } catch (error) {
        console.error('Error in component:', error);
        setError('Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, []);

 const jacketRecommendation = weatherData ? shouldWearJacket(weatherData) : false;
 const backgroundColor = jacketRecommendation ? 'lightgreen' : 'lightcoral';


if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, backgroundColor }}>
      {weatherData ? (
        <>
          <p style={styles.temperatureText}>Feels Like: {convertKelvinToFahrenheit(weatherData.main.feels_like)}°F</p>
          <p style={styles.conditionText}>Condition: {weatherData.weather[0].description}</p>
          <p style={styles.recommendationText}>{jacketRecommendation ? 'Wear a jacket' : 'No jacket needed'}</p>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

// Convert StyleSheet to CSS-in-JS
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px', // padding around the edges
    height: '100vh', // to make the container full height
  },
  temperatureText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Darker text for better readability
    marginBottom: '10px', // Space between temperature and condition
  },
  conditionText: {
    fontSize: '20px',
    color: '#555', // Slightly lighter color
    marginBottom: '20px', // Space between condition and recommendation
  },
  recommendationText: {
    fontSize: '50px',
    color: '#807f7d', // Use color to highlight the recommendation
    fontWeight: '500', // Slightly bolder than normal text
  },
};
