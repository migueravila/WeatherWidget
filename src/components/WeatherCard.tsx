//Imports
import React, { useState, ChangeEvent } from 'react';
import { Sun, Moon, Cloud, CloudDrizzle, CloudRain, CloudLightning, CloudSnow, Search, Droplet, Wind, CloudOff } from 'react-feather';

interface WeatherCardProps {
  city: string;
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
  humidity: number;
  description: string;
  iconCode: string;
  error: string | null;
  onLocationChange: (newLocation: string) => void;
}

//Function that returns an iconCode and a backgroundColor depending on the weather condition
const getConditionStyles = (iconCode: string) => {
  const commonProps = {
	size: 135,
  };

  const weatherConditionColors: { [key: string]: string } = {
	'01d': 'bg-orange-500', 
	'01n': 'bg-blue-500',   
	'02d': 'bg-blue-400',
	'02n': 'bg-indigo-800',
	'03d': 'bg-gray-600',
	'03n': 'bg-gray-700',
	'04d': 'bg-gray-600',
	'04n': 'bg-gray-800',
	'09d': 'bg-blue-500',
	'09n': 'bg-blue-900',
	'10d': 'bg-blue-700',
	'10n': 'bg-blue-900',
	'11d': 'bg-gray-800',
	'11n': 'bg-gray-900',
	'13d': 'bg-sky-900',
	'13n': 'bg-sky-900',
	'50d': 'bg-sky-900',
	'50n': 'bg-sky-900',
	'': 'bg-sky-950'
  };

  const iconComponent = (() => {
	switch (iconCode) {
	  case '01n':
		  return <Moon {...commonProps} />;
	  case '01d':
		return <Sun {...commonProps} />;
	  case '02d':
	  case '02n':
	  case '03d':
	  case '03n':
	  case '04d':
	  case '04n':
	  case '50d':
	  case '50n':
		return <Cloud {...commonProps} />;
	  case '09d':
	  case '09n':
		return <CloudDrizzle {...commonProps} />;
	  case '10d':
	  case '10n':
		return <CloudRain {...commonProps} />;
	  case '11d':
	  case '11n':
		return <CloudLightning {...commonProps} />;
	  case '13d':
	  case '13n':
		return <CloudSnow {...commonProps} />;
	  default:
		return <CloudOff {...commonProps} />;
	}
  })();

  return { iconComponent, backgroundColor: weatherConditionColors[iconCode] || '' };
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  temperatureMax,
  temperatureMin,
  windSpeed,
  humidity,
  description,
  iconCode,
  error,
  onLocationChange,
}) => {
  const [value, setValue] = useState('Monterrey');
  
  //Events handler function
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	setValue(event.target.value);
  };

  const handleButtonClick = () => {
	onLocationChange(value);
  };

  const { iconComponent, backgroundColor } = getConditionStyles(iconCode);

  return (
	<div className="flex flex-row items-center justify-between max-w-md w-full bg-white rounded-xl overflow-hidden shadow-lg">
	  <div className="w-96 p-6">
		<div className="text-7xl font-bold mb-2 md:mb-0">{Math.round(temperature)}°</div>
		<div className="text-gray-600 capitalize mb-2">
		  ▲{Math.round(temperatureMin)}°  ▼{Math.round(temperatureMax)}°
		</div>
		<div className="text-gray-600 capitalize text-lg">
			{error ? (
				<span className="text-red-500 font-bold text-xs">{error}</span>
			  ) : (
				description
			  )}	
		</div>
		<div className="flex items-center justify-center mt-4">
			<input
			  type="text"
			  placeholder="Enter new city"
			  value={value}
			  onChange={handleChange}
			  className="w-full border p-2 rounded-l-lg"
			/>
			<button onClick={handleButtonClick} className="bg-blue-500 text-white rounded-r-lg p-2">
			  <Search size={25} />
			</button>
		  </div>
	  </div>
	  <div className={`flex flex-col items-center h-72 w-72 justify-center p-6 text-white ${backgroundColor}`}>
		{iconComponent}
		<div className="flex flex-row items-center justify-between mt-6">
		  <div className="flex flex-row items-center w-20">
			<Droplet size={30} />
			<p className="ml-1">{humidity}%</p>
		  </div>
		  <div className="flex flex-row items-center w-20 ml-2">
			<Wind size={30} />
			<p className="ml-1">{Math.round(windSpeed)}m/s</p>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default WeatherCard;