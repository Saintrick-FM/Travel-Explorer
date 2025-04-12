const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function initWeather() {
  // Initialize weather module
}

export async function updateWeather(destination) {
  const weatherCard = document.querySelector('.weather-card');
  
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${WEATHER_API_KEY}`
    );
    
    if (!response.ok) throw new Error('Weather data not found');
    
    const data = await response.json();
    
    weatherCard.innerHTML = `
      <h2>Current Weather in ${data.name}</h2>
      <div class="weather-info">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
             alt="${data.weather[0].description}">
        <p class="temperature">${Math.round(data.main.temp)}°C</p>
        <p class="description">${data.weather[0].description}</p>
        <p class="details">
          Humidity: ${data.main.humidity}% | 
          Wind: ${data.wind.speed} m/s
        </p>
      </div>
    `;
  } catch (error) {
    weatherCard.innerHTML = '<p class="error">Weather information unavailable</p>';
    console.error('Error fetching weather:', error);
  }
}