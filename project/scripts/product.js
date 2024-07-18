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

    // Fetch and display product data
    async function fetchProducts() { 
        try {
            const response = await fetch('https://wiselinda.github.io/wdd231/project/data/productData.json');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        const productCatalog = document.getElementById('product-catalog');
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

    fetchProducts();
});
