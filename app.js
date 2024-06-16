document.addEventListener('DOMContentLoaded', function() {
    fetchChallenges();
    document.getElementById('fetch-user-data').addEventListener('click', fetchUserData);
});

async function fetchChallenges() {
    let response;
    try {
        response = await fetch(baseURL + 'problems?limit=20');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data && data.problemsetQuestionList && Array.isArray(data.problemsetQuestionList) && data.problemsetQuestionList.length > 0) {
            displayChallenges(data.problemsetQuestionList);
        } else {
            throw new Error('Invalid data format or empty problems array');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayChallenges(challenges) {
    const challengesList = document.getElementById('challenges');
    challengesList.innerHTML = '';  // Clear any existing content

    challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge.title;
        li.addEventListener('click', () => showChallengeDetails(challenge));
        challengesList.appendChild(li);
    });
}

async function showChallengeDetails(challenge) {
    let response;
    try {
        response = await fetch(baseURL + `select?titleSlug=${challenge.titleSlug}`);
        if (!response.ok) {
            throw new Error('Problem details not found');
        }
        const data = await response.json();

        document.getElementById('challenge-list').style.display = 'none';
        document.getElementById('challenge-detail').style.display = 'block';

        document.getElementById('problem-title').textContent = data.title;
        document.getElementById('problem-description').textContent = data.content;
        document.getElementById('problem-constraints').textContent = `Difficulty: ${data.difficulty}`;
    } catch (error) {
        console.error('Error fetching problem details:', error);
    }
}

async function fetchUserData() {
    const username = document.getElementById('username').value;
    if (!username) return;

    let response;
    try {
        response = await fetch(`${baseURL}${username}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Show elements and populate data
        document.getElementById('user-details').classList.remove('hidden');
        document.getElementById('user-badges').classList.remove('hidden');
        document.getElementById('user-solved-questions').classList.remove('hidden');
        document.getElementById('user-contest-history').classList.remove('hidden');

        // Populate data here...

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
/*** dark mode code */
