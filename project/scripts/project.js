document.addEventListener("DOMContentLoaded", function() {
    // Set the current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Toggle menu visibility on hamburger click
    const hamburger = document.getElementById('menu');
    const navLinks = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Import and fetch data from JSON files and API
    import('./weather.js').then(module => {
        const fetchWeather = module.fetchWeather;
        fetchWeather();
    });

    // Fetch Vendor Data
    async function fetchVendors() {
        try {
            const response = await fetch('vendorData.json');
            const vendors = await response.json();
            displayVendors(vendors);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    }

    // Fetch Product Data
    async function fetchProducts() {
        try {
            const response = await fetch('productData.json');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Fetch Event Data
    async function fetchEvents() {
        try {
            const response = await fetch('eventData.json');
            const events = await response.json();
            displayEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Display Vendors
    function displayVendors(vendors) {
        const vendorList = document.getElementById('vendorList');
        vendors.forEach(vendor => {
            const vendorItem = document.createElement('div');
            vendorItem.classList.add('vendor');
            vendorItem.innerHTML = `
                <h3>${vendor.name}</h3>
                <p>${vendor.description}</p>
                <button onclick="openModal('${vendor.id}')">More Info</button>
            `;
            vendorList.appendChild(vendorItem);
        });
    }

    // Display Products
    function displayProducts(products) {
        const productCatalog = document.getElementById('productCatalog');
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price}</p>
                <button onclick="openModal('${product.id}')">More Info</button>
            `;
            productCatalog.appendChild(productItem);
        });
    }

    // Display Events
    function displayEvents(events) {
        const eventsList = document.getElementById('eventList');
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event');
            eventItem.innerHTML = `
                <h3>${event.name}</h3>
                <p>${event.date}</p>
                <button onclick="openModal('${event.id}')">More Info</button>
            `;
            eventsList.appendChild(eventItem);
        });
    }

    // Modal Functionality
    function openModal(id) {
        const modal = document.getElementById(`modal-${id}`);
        modal.style.display = 'block';
    }

    function closeModal(id) {
        const modal = document.getElementById(`modal-${id}`);
        modal.style.display = 'none';
    }

    // Subscribe Form
    const subscribeForm = document.getElementById('subscribe-form');
    subscribeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        localStorage.setItem('subscriber', JSON.stringify({ name, email }));
        alert('Thank you for subscribing!');
    });

    // Fetch and display data on page load
    if (document.getElementById('vendorList')) fetchVendors();
    if (document.getElementById('productCatalog')) fetchProducts();
    if (document.getElementById('eventList')) fetchEvents();
});

