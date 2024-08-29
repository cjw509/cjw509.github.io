// Load the saved status on page load
document.querySelectorAll('.book').forEach(bookElement => {
    const bookTitle = bookElement.querySelector('p').textContent;
    const savedStatus = localStorage.getItem(bookTitle);

    if (savedStatus) {
        bookElement.setAttribute('data-status', savedStatus);
    }
});

function toggleStatus(bookElement) {
    const currentStatus = bookElement.getAttribute('data-status');
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    const bookTitle = bookElement.querySelector('p').textContent;

    // Update the data-status attribute
    bookElement.setAttribute('data-status', newStatus);
    localStorage.setItem(bookTitle, newStatus);

    // Toggle the strikethrough class on the book title
    const titleElement = bookElement.querySelector('p');
    if (newStatus === 'read') {
        titleElement.classList.add('strikethrough');
    } else {
        titleElement.classList.remove('strikethrough');
    }

    // Toggle the grayscale class on the book image
    const imgElement = bookElement.querySelector('img');
    if (newStatus === 'read') {
        imgElement.classList.add('grayscale');
    } else {
        imgElement.classList.remove('grayscale');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.book').forEach(bookElement => {
        const status = bookElement.getAttribute('data-status');
        
        if (status === 'read') {
            const titleElement = bookElement.querySelector('p');
            const imgElement = bookElement.querySelector('img');

            // Apply strikethrough and grayscale on load if the book is read
            titleElement.classList.add('strikethrough');
            imgElement.classList.add('grayscale');
        }
    });
});
