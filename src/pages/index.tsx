//Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/globals.scss';

//Components
import WeatherCard from '../components/WeatherCard';

//Services
import getWeatherData from '../services/weatherService';

//Main Index Component
const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('Monterrey');

  const fetchData = async (city: string) => {
	  const { data, error } = await getWeatherData(city);
  
	  if (error) {
		setError(error);
		setWeatherData(null);
	  } else {
		setError(null);
		setWeatherData(data);
	  }
	};
  
	useEffect(() => {
	  fetchData(location);
	}, [location]); 
	
	return (
	  <div className="flex items-center justify-center h-screen">
		<WeatherCard
		  city={weatherData?.city || 'DefaultCity'}
		  temperature={weatherData?.temperature || 0}
		  temperatureMax={weatherData?.temperatureMax || 0}
		  temperatureMin={weatherData?.temperatureMin || 0}
		  windSpeed={weatherData?.windSpeed || 0}
		  humidity={weatherData?.humidity || 0}
		  description={weatherData?.description || ''}
		  iconCode={weatherData?.iconCode || ''}
		  error={error}
		  onLocationChange={(newLocation) => {
			  setLocation(newLocation);
			  setError(null);
		  }}
		/>
	  </div>
	);
};

export default Home;
