// darkmode.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('#dark-mode-toggle');

    darkModeToggle.addEventListener('click', function() {
        const body = document.body;
        body.classList.toggle('dark-mode');

        // Save user preference in localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    });

    // Check localStorage for user preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});
