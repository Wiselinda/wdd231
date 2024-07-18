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
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        const productCatalog = document.getElementById('product-catalog');
        productCatalog.innerHTML = ''; // Clear previous content
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

    function openModal(productId) {
        fetch('https://wiselinda.github.io/wdd231/project/data/productData.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    document.getElementById('modal-title').textContent = product.name;
                    document.getElementById('modal-image').src = `images/${product.image}`;
                    document.getElementById('modal-image').alt = product.name;
                    document.getElementById('modal-category').textContent = product.category;
                    document.getElementById('modal-price').textContent = product.price;
                    document.getElementById('modal-description').textContent = product.description;
                    document.getElementById('product-modal').style.display = 'block';
                }
            })
            .catch(error => console.error('Error fetching product details:', error));
    }

    function closeModal() {
        document.getElementById('product-modal').style.display = 'none';
    }

    document.getElementById('modal-close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('product-modal')) {
            closeModal();
        }
    });

    fetchProducts();
});

// Make openModal a global function so it can be accessed by the onclick attribute in HTML
window.openModal = openModal;