document.addEventListener('DOMContentLoaded', () => {
    // Set the current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // Set the last modified date
    document.getElementById('lastModified').textContent = 'Last updated: ' + document.lastModified;

    // Course data
    const courses = [
        { id: 'CSE 110', name: 'Introduction to Computer Science', type: 'CSE', completed: false },
        { id: 'WDD 130', name: 'Web Design Basics', type: 'WDD', completed: true },
        { id: 'CSE 111', name: 'Programming Principles', type: 'CSE', completed: true },
        { id: 'CSE 210', name: 'Software Engineering', type: 'CSE', completed: false },
        { id: 'WDD 131', name: 'Advanced Web Design', type: 'WDD', completed: true },
        { id: 'WDD 231', name: 'Web Development', type: 'WDD', completed: false },
    ];

    // Display all courses
    const displayCourses = (filter = 'All') => {
        const courseCards = document.getElementById('course-cards');
        courseCards.innerHTML = '';
        const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.type === filter);
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course-card';
            courseDiv.textContent = `${course.id}: ${course.name}`;
            courseDiv.style.backgroundColor = course.completed ? 'lightgreen' : 'lightcoral';
            courseCards.appendChild(courseDiv);
        });
    };

    // Event listeners for filter buttons
    document.getElementById('all-btn').addEventListener('click', () => displayCourses('All'));
    document.getElementById('cse-btn').addEventListener('click', () => displayCourses('CSE'));
    document.getElementById('wdd-btn').addEventListener('click', () => displayCourses('WDD'));

    // Initial display of courses
    displayCourses();

    // Hamburger menu toggle
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.getElementById('menu');

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});