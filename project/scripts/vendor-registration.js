document.addEventListener("DOMContentLoaded", function() {
    // Set the current year in the footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Set the last modified date in the footer
    document.getElementById('last-modified').textContent = new Date(document.lastModified).toLocaleDateString();
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    // Toggle menu for hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Highlight current navigation link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkElements = document.querySelectorAll('nav ul li a');
    navLinkElements.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('current');
        }
    });

    // Set timestamp in the form on vendorregistration.html
    if (document.getElementById('timestamp')) {
        document.getElementById('timestamp').value = new Date().toISOString();
    }

    // Display form details on thankyou.html
    if (window.location.pathname.endsWith('thankyou.html')) {
        displayFormDetails();
    }

    
    // Handle form submission for vendorregistration.html
    if (document.querySelector('form')) {
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();

            // Gather form data
            const formData = new FormData(event.target);
            const queryString = new URLSearchParams(formData).toString();

            // Redirect to thankyou.html with form data
            window.location.href = `thankyou.html?${queryString}`;
        });
    } 

    // Handle modal open and close
    const modal = document.getElementById('myModal');
    const learnMoreButton = document.getElementById('modal-btn');
    const closeButtons = document.querySelectorAll('.close');
    const boothDetails = document.querySelectorAll('.booth-detail'); 

    learnMoreButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    
    // Display booth details on click
    boothDetails.forEach(detail => {
        detail.addEventListener('click', () => {
            // Hide all details first
            boothDetails.forEach(d => {
                d.classList.remove('active');
            });
            // Show the clicked detail
            detail.classList.add('active');
        });
    });
});

function displayFormDetails() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('first-name').textContent = urlParams.get('firstName') || 'N/A';
    document.getElementById('last-name').textContent = urlParams.get('lastName') || 'N/A';
    document.getElementById('email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('phone').textContent = urlParams.get('phone') || 'N/A';
    document.getElementById('organization').textContent = urlParams.get('orgName') || 'N/A';
    document.getElementById('message').textContent = urlParams.get('message') || 'N/A';
    document.getElementById('timestamp').textContent = new Date(urlParams.get('timestamp')).toLocaleString() || 'N/A';
}