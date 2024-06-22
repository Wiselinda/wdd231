document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('directory');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    // Set current year
    yearSpan.textContent = new Date().getFullYear();

    // Set last modified date
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch members data
    async function fetchMembers() {
        try {
            const response = await fetch('https://wiselinda.github.io/wdd231/chamber/data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const members = await response.json();
            return members;
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Display members in the directory
    function displayMembers(members, view) {
        directory.innerHTML = '';
        if (view === 'grid') {
            directory.classList.add('grid');
            directory.classList.remove('list');
        } else {
            directory.classList.add('list');
            directory.classList.remove('grid');
        }
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = view === 'grid' ? 'card' : 'list-item';
            card.innerHTML = `
                <div class="image-container">
                    <img src="https://wiselinda.github.io/wdd231/chamber/images/${member.image}" alt="${member.name} Logo">
                </div>
                <div class="content-container">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                </div>
            `;
            directory.appendChild(card);
        });
    }

    // Fetch and display members initially in grid view
    fetchMembers().then(members => {
        if (members) {
            displayMembers(members, 'grid');
        }
    });

    // Event listener for grid view button
    gridViewBtn.addEventListener('click', () => {
        fetchMembers().then(members => {
            if (members) {
                displayMembers(members, 'grid');
            }
        });
    });

    // Event listener for list view button
    listViewBtn.addEventListener('click', () => {
        fetchMembers().then(members => {
            if (members) {
                displayMembers(members, 'list');
            }
        });
    });

    // Toggle menu for hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Highlight the current page link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinkElements = document.querySelectorAll('nav ul li a');

    navLinkElements.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('current');
        }
    });
});