document.addEventListener("DOMContentLoaded", () => {
    // Set the current year in the footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Set the last modified date in the footer
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();

    // Function to handle hamburger menu for mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img.lazy');

    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && !img.classList.contains('loaded')) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
        });
    };

    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);

    // Check for last visit date
    const lastVisitKey = 'lastVisit';
    const lastVisit = localStorage.getItem(lastVisitKey);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    let message = '';

    if (lastVisit) {
        const daysSinceLastVisit = Math.floor((now - parseInt(lastVisit)) / oneDay); // Parse stored value as integer
        if (daysSinceLastVisit < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit === 1 ? '' : 's'} ago.`;
        }
    } else {
        message = "Welcome! Let us know if you have any questions.";
    }

    document.getElementById('visitMessage').textContent = message; // Corrected the ID here

    // Store current visit date
    localStorage.setItem(lastVisitKey, now);

    // Add hover effect for non-mobile views
    const images = document.querySelectorAll('.image-gallery img');
    if (window.innerWidth > 768) {
        images.forEach(img => {
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.05)';
            });
            img.addEventListener('mouseout', () => {
                img.style.transform = 'none';
            });
        });
    }

    // Placeholder for fetching history data, ensure these functions are defined elsewhere
    if (typeof fetchHistoryData === 'function') {
        fetchHistoryData();
    }

    // Placeholder for fetching current events data, ensure these functions are defined elsewhere
    if (typeof fetchCurrentEventsData === 'function') {
        fetchCurrentEventsData();
    }
});