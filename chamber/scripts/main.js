document.addEventListener("DOMContentLoaded", () => {
    // Set the current year in the footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Set the last modified date in the footer
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();

    // Toggle between grid and list views
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const directory = document.getElementById("directory");

    gridViewBtn.addEventListener("click", () => {
        directory.classList.remove("list-view");
        directory.classList.add("grid-view");
    });

    listViewBtn.addEventListener("click", () => {
        directory.classList.remove("grid-view");
        directory.classList.add("list-view");
    });

    // Toggle navigation for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fetch and display member data
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            const directoryContainer = document.getElementById("directory");
            data.members.forEach(member => {
                const item = document.createElement("div");
                item.className = "directory-item";

                item.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}">${member.website}</a>
                `;

                directoryContainer.appendChild(item);
            });
        });

    // Function to fetch current weather
    function fetchCurrentWeather() {
        const currentWeatherData = {
            temp: 75,
            condition: "Partly Cloudy",
            icon: "https://openweathermap.org/img/wn/03d.png",
            high: 85,
            low: 52,
            humidity: 34,
            sunrise: "7:30 AM",
            sunset: "9:59 PM"
        };

        // Update weather details in the DOM
        document.getElementById("weather-icon").src = currentWeatherData.icon;
        document.getElementById("weather-temp").textContent = `Temperature: ${currentWeatherData.temp}°F`;
        document.getElementById("weather-condition").textContent = `Condition: ${currentWeatherData.condition}`;
        document.getElementById("weather-high-low").textContent = `High: ${currentWeatherData.high}°F, Low: ${currentWeatherData.low}°F`;
        document.getElementById("weather-humidity").textContent = `Humidity: ${currentWeatherData.humidity}%`;
        document.getElementById("weather-sunrise").textContent = `Sunrise: ${currentWeatherData.sunrise}`;
        document.getElementById("weather-sunset").textContent = `Sunset: ${currentWeatherData.sunset}`;
    }

    // Function to fetch weather forecast
    function fetchWeatherForecast() {
        const forecastData = {
            today: 90,
            wednesday: 89,
            thursday: 69
        };

        // Update forecast details in the DOM
        document.getElementById("forecast-today").textContent = `Today: ${forecastData.today}°F`;
        document.getElementById("forecast-wednesday").textContent = `Wednesday: ${forecastData.wednesday}°F`;
        document.getElementById("forecast-thursday").textContent = `Thursday: ${forecastData.thursday}°F`;
    }

    // Function to fetch and display upcoming events
    function fetchUpcomingEvents() {
        const events = [
            { name: "Farmers Market", date: "2023-06-22" },
            { name: "Summer Festival", date: "2023-07-15" },
            { name: "Business Expo", date: "2023-08-09" }
        ];

        const eventsList = document.getElementById("events-list");
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.name} - ${new Date(event.date).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
            eventsList.appendChild(li);
        });
    }

    // Call functions to fetch data when the document is loaded
    fetchCurrentWeather();
    fetchWeatherForecast();
    fetchUpcomingEvents();
});

