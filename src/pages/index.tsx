//Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/globals.scss';

//Components
import WeatherCard from '../components/WeatherCard';

//Services
import getWeatherData from '../services/weatherService';


// Interface for WeatherData
interface WeatherData {
  city: string;
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
  humidity: number;
  description: string;
  iconCode: string;
}

//Main Index Component
const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string>('');
	const [location, setLocation] = useState<string>('Monterrey');

  //Fetch the data using weatherService.ts
  const fetchData = async (city: string) => {
	  const { data, error } = await getWeatherData(city);
  
	  if (error) {
		setError(error);
		setWeatherData(null);
	  } else {
		setError('');
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
			  setError('');
		  }}
		/>
	  </div>
	);
};

export default Home;
