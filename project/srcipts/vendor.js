// Import statements (if using ES modules)
// import { fetchData } from './api.js';

// Selecting elements and initializing variables
const gallery = document.querySelector('.gallery');
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalContent = document.querySelector('.modal-content');
const modalOverlay = document.querySelector('.modal-overlay');
const vendorDataUrl = 'https://api.example.com/vendors'; // Replace with your actual API endpoint

// Function to fetch vendor data from API
async function fetchVendorData() {
    try {
        const response = await fetch(vendorDataUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vendor data:', error);
    }
}

// Function to build and display vendor items dynamically
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

// Function to open modal and display item details
function openModal(item) {
    modalContainer.classList.add('open');
    modalContent.innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>Location: ${item.location}</p>
        <p>Category: ${item.category}</p>
        <button class="close-modal-btn">Close</button>
    `;
    modalOverlay.style.display = 'block';

    // Event listener for closing modal
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModalOutside);
}

// Function to close modal
function closeModal() {
    modalContainer.classList.remove('open');
    modalOverlay.style.display = 'none';
    closeModalBtn.removeEventListener('click', closeModal);
    modalOverlay.removeEventListener('click', closeModalOutside);
}

// Function to close modal when clicking outside of it
function closeModalOutside(event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
}

// Initialize page with vendor data
document.addEventListener('DOMContentLoaded', async () => {
    const vendorData = await fetchVendorData();
    if (vendorData) {
        displayVendorItems(vendorData.slice(0, 15)); // Display first 15 items
    }
});

// Example of localStorage usage (if applicable)
// const visited = localStorage.getItem('visited');
// if (!visited) {
//     localStorage.setItem('visited', 'true');
// }

// Example of using template literals and array methods
// const greeting = `Hello, ${user.name}!`;
// const filteredItems = items.filter(item => item.price > 10);

// Example of conditional branching
// if (user.isAdmin) {
//     // Admin-specific actions
// } else {
//     // Regular user actions
// }

