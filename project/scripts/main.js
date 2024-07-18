import { fetchVendorData } from './vendorApi.js';
import { openModal } from './modal.js';

document.addEventListener("DOMContentLoaded", async function() {
    // Set the current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Selecting elements and initializing variables
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
    const gallery = document.querySelector('.gallery');

    // Toggle menu visibility on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Initialize page with vendor data
    const vendorData = await fetchVendorData();
    if (vendorData) {
        displayVendorItems(vendorData.slice(0, 15)); // Display first 15 items
    }

    function displayVendorItems(items) {
        gallery.innerHTML = ''; // Clear existing content
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('gallery-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <button class="open-modal-btn" data-id="${item.id}">View Details</button>
            `;
            gallery.appendChild(itemElement);

            // Event listener for opening modal
            const viewDetailsBtn = itemElement.querySelector('.open-modal-btn');
            viewDetailsBtn.addEventListener('click', () => openModal(item));
        });
    }

    // Example of localStorage usage
    const visited = localStorage.getItem('visited');
    if (!visited) {
        localStorage.setItem('visited', 'true');
        console.log('Welcome to the Local Farmers\' Market Hub!');
    } else {
        console.log('Welcome back to the Local Farmers\' Market Hub!');
    }

    // Example of using template literals and array methods
    const user = { name: 'Visitor', isAdmin: false }; // Example user
    const greeting = `Hello, ${user.name}!`;
    console.log(greeting);

    const items = vendorData.slice(0, 15);
    const expensiveItems = items.filter(item => item.price > 10);
    console.log('Expensive items:', expensiveItems);

    // Example of conditional branching
    if (user.isAdmin) {
        console.log('Admin-specific actions');
    } else {
        console.log('Regular user actions');
    }
});
