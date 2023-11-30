import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/globals.scss';

import WeatherCard from '../components/WeatherCard';

const Home: React.FC = () => {
  return (
	<div className="flex items-center justify-center h-screen">
	  <WeatherCard/>
	</div>
  );
};

export default Home;
