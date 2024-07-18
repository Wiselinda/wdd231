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
        eventsList.innerHTML = ''; // Clear previous content
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event');
            eventItem.innerHTML = `
                <img src="images/${event.image}" alt="${event.name}">
                <h3>${event.name}</h3>
                <p>${event.date}</p>
                <button onclick="openModal('${event.id}')">More Info</button>
            `;
            eventsList.appendChild(eventItem);
        });
    }

    function openModal(eventId) {
        fetch('https://wiselinda.github.io/wdd231/project/data/eventData.json')
            .then(response => response.json())
            .then(events => {
                const event = events.find(e => e.id === eventId);
                if (event) {
                    document.getElementById('modal-title').textContent = event.name;
                    document.getElementById('modal-image').src = `images/${event.image}`;
                    document.getElementById('modal-image').alt = event.name;
                    document.getElementById('modal-date').textContent = event.date;
                    document.getElementById('modal-description').textContent = event.description;
                    document.getElementById('event-modal').style.display = 'block';
                }
            })
            .catch(error => console.error('Error fetching event details:', error));
    }

    function closeModal() {
        document.getElementById('event-modal').style.display = 'none';
    }

    document.getElementById('modal-close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('event-modal')) {
            closeModal();
        }
    });

    fetchEvents();
});

// Make openModal a global function so it can be accessed by the onclick attribute in HTML
window.openModal = openModal;