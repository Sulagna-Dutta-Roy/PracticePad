document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetch-user-data').addEventListener('click', fetchCalendar);
});

async function fetchCalendar() {
    const username = document.getElementById('username').value;
    if (!username) return;

    let response;
    try {
        response = await fetch(`${baseURL}${username}/calendar`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const calendarData = await response.json();
        displayCalendar(calendarData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
}

function displayCalendar(calendarData) {
    const calendar = document.getElementById('submission-calendar');
    calendar.innerHTML = '';
    // Assume calendarData is a JSON object with date keys and submission counts as values
    for (const date in calendarData) {
        const count = calendarData[date];
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('calendar-date');
        dateDiv.textContent = `${date}: ${count} submissions`;
        calendar.appendChild(dateDiv);
    }
    document.getElementById('calendar').classList.remove('hidden');
}
