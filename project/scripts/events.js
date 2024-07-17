document.addEventListener("DOMContentLoaded", function() {
    // Set the current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    // Toggle menu visibility on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Fetch and display event data
    async function fetchEvents() {
        try {
            const response = await fetch('https://wiselinda.github.io/wdd231/project/data/eventData.json');
            const events = await response.json();
            displayEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    function displayEvents(events) {
        const eventsList = document.getElementById('events-list');
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event');
            eventItem.innerHTML = `
                <img src="images/${event.image}" alt="${event.name}">
                <h3>${event.name}</h3>
                <p>${event.date}</p>
                <p>${event.description}</p>
                <button onclick="openModal('${event.id}')">More Info</button>
            `;
            eventsList.appendChild(eventItem);
        });
    }

    fetchEvents();
});

