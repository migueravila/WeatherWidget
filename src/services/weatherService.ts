import axios, { AxiosError } from 'axios';

// Asynchronous function to fetch weather data for a given location
const getWeatherData = async (city: string) => {
  try {
	const response = await axios.get(
	  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
	);

	// Error handling
	if (response.data.cod !== 200) {
	  return { error: response.data.message, data: null };
	}

	// Returning weather data if status code is 200 (OK)
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
  } catch (error: unknown) {
	if (axios.isAxiosError(error)) {
	  // Network error, provide a custom message
	  return { error: 'Network error, please check your internet connection', data: null };
	}

	// Other errors, return a general error message
	return { error: 'Unrecognized city or an unexpected error occurred', data: null };
  }
};

export default getWeatherData;
