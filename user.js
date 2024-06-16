document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-user-data');
    if (fetchButton) {
        fetchButton.addEventListener('click', async () => {
            const usernameInput = document.getElementById('username');
            const username = usernameInput.value.trim(); // Trim whitespace from username input
            if (username) {
                try {
                    await fetchUserProfile(username);
                    await fetchUserBadges(username);
                    await fetchSolvedQuestions(username);
                    await fetchContestHistory(username);
                    // Keep the input value after submission
                    usernameInput.value = username;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        });
    }
});

async function fetchUserProfile(username) {
    try {
        const response = await fetch(`${baseURL}${username}`);
        const data = await response.json();
        console.log('UserProfile:', data);

        const userDetailsElement = document.getElementById('user-details');
        if (userDetailsElement) {
            userDetailsElement.textContent = `Username: ${data.username}, Name: ${data.name}`;
        } else {
            console.error('Element with ID "user-details" not found.');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

async function fetchUserBadges(username) {
    try {
        const response = await fetch(`${baseURL}${username}/badges`);
        const data = await response.json();
        console.log('UserBadges:', data);

        const userBadgesElement = document.getElementById('user-badges');
        if (userBadgesElement) {
            if (Array.isArray(data.badges)) {
                userBadgesElement.textContent = `Badges: ${data.badges.map(badge => badge.displayName).join(', ')}`;
            } else {
                userBadgesElement.textContent = 'Badges not found.';
            }
        } else {
            console.error('Element with ID "user-badges" not found.');
        }
    } catch (error) {
        console.error('Error fetching user badges:', error);
        throw error; // Propagate error to handle in the click event listener
    }
}

async function fetchSolvedQuestions(username) {
    try {
        const response = await fetch(`${baseURL}${username}/solved`);
        const data = await response.json();
        console.log('SolvedQuestions:', data);

        const solvedQuestionsElement = document.getElementById('user-solved-questions');
        if (solvedQuestionsElement) {
            const totalSolved = data.solvedProblem;
            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;

            solvedQuestionsElement.innerHTML = `
                <p>Total Solved: ${totalSolved}</p>
                <p>Easy Solved: ${easySolved}</p>
                <p>Medium Solved: ${mediumSolved}</p>
                <p>Hard Solved: ${hardSolved}</p>
            `;

            const totalSubmissionNum = data.totalSubmissionNum.find(item => item.difficulty === 'All');
            if (totalSubmissionNum) {
                solvedQuestionsElement.innerHTML += `
                    <p>Total Submissions: ${totalSubmissionNum.submissions}</p>
                `;
            } else {
                console.error('Total submission data not found.');
            }
        } else {
            console.error('Element with ID "user-solved-questions" not found.');
        }
    } catch (error) {
        console.error('Error fetching solved questions:', error);
        throw error;
    }
}


async function fetchContestHistory(username) {

    try {
        const response = await fetch(`${baseURL}${username}/contest/history`);
        const data = await response.json();
        console.log('ContestHistory:', data);

        const contestHistoryElement = document.getElementById('user-contest-history');
        if (contestHistoryElement) {
            // Assuming `data` is an array of contest history entries
            const formattedHistory = data.contestHistory.map(entry => {
                return `${entry.contest.title} (${new Date(entry.contest.startTime * 1000).toLocaleString()}): Rating ${entry.rating}, Rank ${entry.ranking}, Problems Solved ${entry.problemsSolved}/${entry.totalProblems}`;
            }).join('\n');

            contestHistoryElement.textContent = `Contest History:\n${formattedHistory}`;
        } else {
            console.error('Element with ID "user-contest-history" not found.');
        }
    } catch (error) {
        console.error('Error fetching contest history:', error);
        throw error;
    }
}
