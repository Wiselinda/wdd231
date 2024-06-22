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

    document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display membership levels
    fetchMembershipLevels();

    // Handle application form submission
    document.querySelector(".application-form").addEventListener("submit", (event) => {
        event.preventDefault();
        submitApplicationForm();
    });
});

function fetchMembershipLevels() {
    // Code to fetch and display membership levels from an external source or API
}

function submitApplicationForm() {
    // Code to handle form submission, validation, and sending data to the server
}


});
