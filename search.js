document.addEventListener('DOMContentLoaded', function() {
    // Event listener for search button click
    document.getElementById('search-button').addEventListener('click', function() {
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        filterChallenges(searchQuery);
    });

    // Event listener for input field change (optional)
    document.getElementById('search-input').addEventListener('input', function() {
        const searchQuery = this.value.trim().toLowerCase();
        filterChallenges(searchQuery);
    });
});

function filterChallenges(query) {
    const challenges = document.querySelectorAll('#challenges li');
    challenges.forEach(challenge => {
        const title = challenge.textContent.toLowerCase();
        if (title.includes(query)) {
            challenge.style.display = 'block';
        } else {
            challenge.style.display = 'none';
        }
    });
}
