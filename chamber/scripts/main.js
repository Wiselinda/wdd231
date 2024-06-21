document.addEventListener("DOMContentLoaded", async () => {
    // Set the current year in the footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Set the last modified date in the footer
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();

    // Toggle between grid and list views
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const directory = document.getElementById("directory");

    gridViewBtn.addEventListener("click", () => {
        directory.classList.remove("list");
        directory.classList.add("grid");
    });

    listViewBtn.addEventListener("click", () => {
        directory.classList.remove("grid");
        directory.classList.add("list");
    });

    // Function to fetch member data and display
    async function fetchAndDisplayMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayMembers(data.members); // Call displayMembers function with member data
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    // Function to display members based on current view mode (grid or list)
    function displayMembers(members) {
        const directoryContainer = document.getElementById("directory");
        directoryContainer.innerHTML = ''; // Clear previous content
        const viewMode = directory.classList.contains("grid") ? "grid" : "list";

        members.forEach(member => {
            const item = document.createElement("div");
            item.className = "directory-item";

            item.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website}</a>
            `;

            directoryContainer.appendChild(item);
        });
    }

    // Initial fetch and display members in grid view
    await fetchAndDisplayMembers();

    // Function to handle hamburger menu for mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Function to fetch current weather (if defined elsewhere)
    fetchCurrentWeather();
    
    // Function to fetch weather forecast (if defined elsewhere)
    fetchWeatherForecast();
    
    // Function to fetch and display upcoming events (if defined elsewhere)
    fetchUpcomingEvents();
});
