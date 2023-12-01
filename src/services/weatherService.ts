import axios from 'axios';

// Asynchronous function to fetch weather data for a given location
const getWeatherData = async (city: string) => {
  try {
	const response = await axios.get(
	  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
	);

	// Check for successful response (status code 200)
	if (response.status === 200) {
	  return {
		error: null,
		data: {
		  city: response.data.name,
		  temperature: response.data.main.temp,
		  temperatureMax: response.data.main.temp_max,
		  temperatureMin: response.data.main.temp_min,
		  windSpeed: response.data.wind.speed,
		  humidity: response.data.main.humidity,
		  description: response.data.weather[0].description,
		  iconCode: response.data.weather[0].icon,
		},
	  };
	} else {
	  // Handle OpenWeatherMap API error
	  return { error: `OpenWeatherMap API error: Status ${response.status}`, data: null };
	}
  } catch {
	// Other possible error
	return { error: 'Unrecognized city.', data: null };
  }
};

export default getWeatherData;
