import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";


const WeatherApp = () => {
    const api_key = "0978222005ab4e37ef709498d478d7dd";

    const [wicon, setWicon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        getWeatherData('Jaipur');
    }, []);

    const getWeatherData = async (cityName) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                setWeatherData(data);
                setWeatherIcon(data.weather[0].icon);
            } else {
                setWeatherData(null);
                alert("Enter Valid City Name");
                
                

            }
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    }

    const setWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                setWicon(clear_icon);
                break;
            case "02d":
            case "02n":
                setWicon(cloud_icon);
                break;
            case "03d":
            case "03n":
                setWicon(drizzle_icon);
                break;
            case "04d":
            case "04n":
                setWicon(drizzle_icon);
                break;
            case "09d":
            case "09n":
                setWicon(drizzle_icon);
                break;
            case "10d":
            case "10n":
                setWicon(drizzle_icon);
                break;
            case "13d":
            case "13n":
                setWicon(snow_icon);
                break;
            default:
                setWicon(clear_icon);
                break;
        }
    }

    const handleSearch = () => {
        const element = document.getElementsByClassName("cityInput");
        const cityName = element[0].value;

        if (cityName) {
            getWeatherData(cityName);
        } else {
            alert("Enter City Name");
            
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={handleSearch}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>

            {weatherData && (
                <div>
                    <div className="weather-image">
                        <img src={wicon} alt="Weather Icon" />
                    </div>
                    <div className="weather-temp">{Math.ceil(weatherData.main.temp)}°C</div>
                    <div className="weather-location">{weatherData.name}</div>
                    <div className='weather-feelslike'>Feels Like: {Math.ceil(weatherData.main.feels_like)}°C</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="Humidity Icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{Math.ceil(weatherData.main.humidity)}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} alt="Wind Icon" className="icon" />
                            <div className="data">
                                <div className="wind-rate">{weatherData.wind.speed} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WeatherApp;
