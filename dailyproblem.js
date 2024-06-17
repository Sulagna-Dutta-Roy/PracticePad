document.addEventListener('DOMContentLoaded', function() {
    fetchDailyProblem();
});

async function fetchDailyProblem() {
    let response;
    try {
        response = await fetch(baseURL + 'daily');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched daily problem data:', data); // Log the fetched data
        displayDailyProblem(data);
    } catch (error) {
        console.error('Error fetching daily problem:', error);
    }
}

function displayDailyProblem(problem) {
    const dailyProblemSection = document.getElementById('daily-problem');
    const titleElement = document.getElementById('daily-problem-title');
    const descriptionElement = document.getElementById('daily-problem-description');
    const difficultyElement = document.getElementById('daily-problem-difficulty');
    const linkElement = document.getElementById('daily-problem-link');

    if (titleElement && descriptionElement && difficultyElement && linkElement) {
        // Update the content based on the actual properties returned by the API
        titleElement.textContent = problem.questionTitle || "Title not available";
        descriptionElement.textContent = problem.date || "Description not available";
        difficultyElement.textContent = `Difficulty: ${problem.difficulty || "Unknown"}`;

        if (problem.questionLink) {
            linkElement.innerHTML = `<a href="${problem.questionLink}" target="_blank">View Problem</a>`;
        } else {
            linkElement.textContent = "Link not available";
        }

        dailyProblemSection.classList.remove('hidden');
    } else {
        console.error('One or more elements not found in the DOM.');
    }
}
