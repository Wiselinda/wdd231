import { fetchNutritionDetails } from './vendorApi.js';
import { openModal, closeModal, closeModalOutside } from './modal.js';

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

    // Initialize page with nutrition data
    try {
        const nutritionData = await fetchNutritionDetails();
        console.log(nutritionData); // Log the nutrition data to understand its structure
        if (nutritionData && nutritionData.ingredients) {
            displayNutritionItems(nutritionData.ingredients); // Display nutrition items
        } else {
            console.error('Expected ingredients data but got:', nutritionData);
        }
    } catch (error) {
        console.error('Error fetching nutrition details:', error);
    }

    function displayNutritionItems(items) {
        gallery.innerHTML = ''; // Clear existing content
        items.forEach(item => {
            item.parsed.forEach(parsedItem => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('gallery-item');
                itemElement.innerHTML = `
                    <h3>${parsedItem.food}</h3>
                    <p>Quantity: ${parsedItem.quantity} ${parsedItem.measure}</p>
                    <p>Weight: ${parsedItem.weight} g</p>
                    <button class="open-modal-btn" data-id="${parsedItem.foodId}">View Details</button>
                `;
                gallery.appendChild(itemElement);

                // Event listener for opening modal
                const viewDetailsBtn = itemElement.querySelector('.open-modal-btn');
                viewDetailsBtn.addEventListener('click', () => openModal(parsedItem));
            });
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

    // Example of conditional branching
    if (user.isAdmin) {
        console.log('Admin-specific actions');
    } else {
        console.log('Regular user actions');
    }
});