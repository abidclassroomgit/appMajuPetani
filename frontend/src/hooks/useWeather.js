import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { WEATHER_DUMMY } from '@/data/weatherDummy';

const API_KEY = '77f0bfee08391cc8959f46a68707bd74';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeather() {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState(WEATHER_DUMMY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    const location = user?.kabupaten || 'Jakarta';
    
    // Check Cache (valid for 10 minutes)
    const cacheKey = `weather_${location}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 10 * 60 * 1000) {
            setWeatherData(data);
            setLoading(false);
            return;
        }
    }

    try {
        // 1. Get Coordinates first (Geocoding) - optional if direct city query works well, but coordinates are safer
        // The API from EMSIFA returns "KABUPATEN SUBANG" (Uppercase).
        // OpenWeatherMap usually expects "Subang,ID" or "Kabupaten Subang,ID".
        // Let's clean it up to be safe: Title Case.
        
        let cleanedLocation = location;
        if (cleanedLocation.toUpperCase().startsWith("KABUPATEN ")) {
            cleanedLocation = cleanedLocation.substring(10); // Remove "KABUPATEN " prefix
        } else if (cleanedLocation.toUpperCase().startsWith("KOTA ")) {
            cleanedLocation = cleanedLocation.substring(5); // Remove "KOTA " prefix
        }

        // Title case helper
        cleanedLocation = cleanedLocation.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

        const query = `${cleanedLocation},ID`;
        console.log("Weather Query:", query); // DEBUG LOG
        
        // Fetch Current Weather
        const currentRes = await fetch(`${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric&lang=id`);
        if (!currentRes.ok) {
            const errDetail = await currentRes.text();
            console.error("Weather API Error (Current):", errDetail);
            throw new Error(`Gagal mengambil data cuaca: ${currentRes.status}`);
        }
        const current = await currentRes.json();
        console.log("Weather Data (Current):", current); // DEBUG LOG

        // Fetch Forecast (5 days / 3 hour)
        const forecastRes = await fetch(`${BASE_URL}/forecast?q=${query}&appid=${API_KEY}&units=metric&lang=id`);
        if (!forecastRes.ok) throw new Error('Gagal mengambil ramalan cuaca');
        const forecastData = await forecastRes.json();

        // Process Data to match our UI structure
        const formattedData = transformWeatherData(current, forecastData);
        
        setWeatherData(formattedData);
        
        // Save to Cache
        localStorage.setItem(cacheKey, JSON.stringify({
            data: formattedData,
            timestamp: Date.now()
        }));

    } catch (err) {
        console.error("Weather API Execution Error:", err);
        setError(err.message);
        // Fallback to dummy if error, but maybe keep old data?
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.kabupaten) {
        setLoading(true); // Ensure loading state starts
        // Force refresh for now to debug (ignore cache if user changed)
        // Or simple strategy: Always fetch if user exists to verify "different location" issue.
        // We will keep cache logic inside fetchWeather but add a log.
        fetchWeather();
    }
  }, [user]); // Re-run when user changes

  // Helper to transform API response to our UI Model
  const transformWeatherData = (current, forecast) => {
    // Current
    const weatherMain = current.weather[0];
    
    // Forecast - simplistic approach: take 1 data point per day (e.g., noon)
    const dailyForecast = [];
    const processedDates = new Set();
    
    forecast.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!processedDates.has(date) && item.dt_txt.includes('12:00:00')) {
            processedDates.add(date);
            dailyForecast.push({
                day: new Date(item.dt * 1000).toLocaleDateString('id-ID', { weekday: 'short' }),
                date: new Date(item.dt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                tempMax: Math.round(item.main.temp_max),
                tempMin: Math.round(item.main.temp_min), // Note: 3hr forecast min/max are for that block, not daily. But close enough for MVP.
                icon: mapIcon(item.weather[0].main),
                condition: item.weather[0].description
            });
        }
    });

    return {
        current: {
            name: current.name, // Add API City Name
            temp: Math.round(current.main.temp),
            condition: weatherMain.description,
            icon: mapIcon(weatherMain.main),
            humidity: current.main.humidity,
            windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
            rainChance: 0, // OpenWeather free API doesn't give precip % directly easily
        },
        forecast: dailyForecast.slice(0, 7), // Limit to 7 days
        alerts: [] // Free API doesn't support alerts
    };
  };

  const mapIcon = (apiMain) => {
      const map = {
          'Clear': 'Sun',
          'Clouds': 'Cloud',
          'Rain': 'CloudRain',
          'Drizzle': 'CloudDrizzle',
          'Thunderstorm': 'CloudRain',
          'Snow': 'Cloud',
      };
      return map[apiMain] || 'Cloud';
  };

  return {
    weather: weatherData,
    loading,
    error,
    refreshWeather: fetchWeather
  };
}
