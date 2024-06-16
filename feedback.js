// DOM elements
const feedbackTitleInput = document.getElementById('feedback-title');
const feedbackDifficultySelect = document.getElementById('feedback-difficulty');
const feedbackTextInput = document.getElementById('feedback-text');
const submitButton = document.getElementById('submit-feedback');
const feedbackList = document.getElementById('feedback-items');

// Event listener for submitting feedback
submitButton.addEventListener('click', () => {
    const title = feedbackTitleInput.value;
    const difficulty = feedbackDifficultySelect.value;
    const feedback = feedbackTextInput.value;

    // Validate input
    if (!title || !difficulty || !feedback) {
        alert('Please fill in all fields');
        return;
    }

    // Create a new feedback item
    const feedbackItem = document.createElement('li');
    feedbackItem.innerHTML = `<strong>${title}</strong> (${difficulty}): ${feedback}`;

    // Append to the list
    feedbackList.appendChild(feedbackItem);

    // Clear form inputs
    feedbackTitleInput.value = '';
    feedbackTextInput.value = '';

    // Optionally, store feedback in local storage
    const feedbackData = {
        title,
        difficulty,
        feedback
    };
    saveFeedback(feedbackData);
});

// Function to save feedback to local storage (or mock API call)
function saveFeedback(feedbackData) {
    // Implement logic to save to local storage or mock API endpoint
    // For example, you can store in an array or local storage
    // Example local storage usage:
    let storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
    storedFeedback.push(feedbackData);
    localStorage.setItem('feedback', JSON.stringify(storedFeedback));
}

// Function to load feedback from local storage (or mock API call)
function loadFeedback() {
    // Implement logic to load from local storage or mock API endpoint
    // For example, load from local storage
    let storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

    // Display stored feedback items
    storedFeedback.forEach(item => {
        const feedbackItem = document.createElement('li');
        feedbackItem.innerHTML = `<strong>${item.title}</strong> (${item.difficulty}): ${item.feedback}`;
        feedbackList.appendChild(feedbackItem);
    });
}

// Load initial feedback on page load
document.addEventListener('DOMContentLoaded', loadFeedback);
