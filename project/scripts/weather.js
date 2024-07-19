export async function fetchWeather() {
    const apiKey = 'd793a0881dbd4f6191c162946241907'; // Your API key
    const location = 'Turkey'; // Your location

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `
        <h3>Weather in ${data.location.name}</h3>
        <p>${data.current.condition.text}</p>
        <p>${data.current.temp_c}°C</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
    `;
}
