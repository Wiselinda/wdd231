export function openModal(item) {
    const modalContainer = document.querySelector('.modal-container');
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');

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
    const closeModalBtn = document.querySelector('.close-modal-btn');
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModalOutside);
}

export function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalContainer.classList.remove('open');
    modalOverlay.style.display = 'none';
    document.querySelector('.close-modal-btn').removeEventListener('click', closeModal);
    modalOverlay.removeEventListener('click', closeModalOutside);
}

export function closeModalOutside(event) {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (event.target === modalOverlay) {
        closeModal();
    }
}
