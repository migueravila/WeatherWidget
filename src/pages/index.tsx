import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/globals.scss';

import WeatherCard from '../components/WeatherCard';

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('Monterrey');

  const getWeatherData = async (city: string) => {
	try {
	  const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
	  );
	  
	  console.log(response);

	  if (response.data.cod !== 200) {
		setError(response.data.message);
		setWeatherData(null);
		return;
	  }
	  
	  setError(null);

	  setWeatherData({
		city: response.data.name,
		temperature: response.data.main.temp,
		temperatureMax: response.data.main.temp_max,
		temperatureMin: response.data.main.temp_min,
		windSpeed: response.data.wind.speed,
		humidity: response.data.main.humidity,
		description: response.data.weather[0].description,
		iconCode: response.data.weather[0].icon,
	  });
	  
	} catch (error) {
	  setError("Unrecognized city");
	  setWeatherData(null);
	}
  };
	
  return (
	<div className="flex items-center justify-center h-screen">
	  <WeatherCard/>
	</div>
  );
};

export default Home;
