
// Function to save the current status of all books to localStorage with page context
function saveBookStatus(pageId) {
    const books = document.querySelectorAll('.book');
    const bookStatuses = [];

    books.forEach(book => {
        const title = book.querySelector('p').textContent;
        const status = book.getAttribute('data-status');
        bookStatuses.push({ title, status });
    });

    localStorage.setItem(`bookStatuses-${pageId}`, JSON.stringify(bookStatuses));
}

// Function to load the book statuses from localStorage with page context
function loadBookStatus(pageId) {
    const bookStatuses = JSON.parse(localStorage.getItem(`bookStatuses-${pageId}`));
    if (bookStatuses && bookStatuses.length > 0) {
        const books = document.querySelectorAll('.book');

        books.forEach((book, index) => {
            if (bookStatuses[index]) {
                const status = bookStatuses[index].status;
                book.setAttribute('data-status', status);

                const titleElement = book.querySelector('p');
                const imgElement = book.querySelector('img');

                if (status === 'read') {
                    titleElement.classList.add('strikethrough');
                    imgElement.classList.add('grayscale');
                } else {
                    titleElement.classList.remove('strikethrough');
                    imgElement.classList.remove('grayscale');
                }
            }
        });
    }
}
// Main function to initialize the state on page load
function initialize() {
    const pageId = document.body.getAttribute('data-page-id') || window.location.pathname;
    loadBookStatus(pageId);
    updateProgress(pageId);
}

// Function to toggle book status and save with page context
function toggleStatus(bookElement) {
    const currentStatus = bookElement.getAttribute('data-status');
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';

    // Update the data-status attribute
    bookElement.setAttribute('data-status', newStatus);

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

    // Update the progress
    const pageId = document.body.getAttribute('data-page-id') || window.location.pathname;
    updateProgress(pageId);

    // Save the current status with page context
    saveBookStatus(pageId);
}

// Function to calculate and update the progress percentage with page context
function updateProgress(pageId) {
    const books = document.querySelectorAll('.book');
    const totalBooks = books.length;
    if (totalBooks === 0) {
        document.getElementById('progress-text').textContent = 'No books to track';
        document.getElementById('progress-bar').style.width = '0%';
        return;
    }

    let readBooks = 0;
    books.forEach(book => {
        if (book.getAttribute('data-status') === 'read') {
            readBooks++;
        }
    });

    const percentage = Math.round((readBooks / totalBooks) * 100);

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    progressBar.style.width = percentage + '%';
    progressText.textContent = `${percentage}% of books read`;
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);