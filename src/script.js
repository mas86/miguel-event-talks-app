document.addEventListener('DOMContentLoaded', () => {
    const talksData = '__TALKS_DATA__';
    const scheduleContainer = document.getElementById('schedule-container');
    const searchBar = document.getElementById('search-bar');

    const schedule = [
        { time: '10:00 AM - 11:00 AM', talk: talksData[0] },
        { time: '11:10 AM - 12:10 PM', talk: talksData[1] },
        { time: '12:10 PM - 1:10 PM', title: 'Lunch Break' },
        { time: '1:10 PM - 2:10 PM', talk: talksData[2] },
        { time: '2:20 PM - 3:20 PM', talk: talksData[3] },
        { time: '3:30 PM - 4:30 PM', talk: talksData[4] },
        { time: '4:40 PM - 5:40 PM', talk: talksData[5] },
    ];

    function renderSchedule(filter = '') {
        scheduleContainer.innerHTML = '';
        const filterLowerCase = filter.toLowerCase();

        schedule.forEach(item => {
            if (item.talk) {
                const hasCategory = item.talk.category.some(cat => cat.toLowerCase().includes(filterLowerCase));
                if (filter && !hasCategory) {
                    return;
                }

                const scheduleItem = document.createElement('div');
                scheduleItem.className = 'schedule-item';
                scheduleItem.innerHTML = `
                    <div class="time">${item.time}</div>
                    <h2>${item.talk.title}</h2>
                    <p><strong>Speakers:</strong> ${item.talk.speakers.join(', ')}</p>
                    <p>${item.talk.description}</p>
                    <div>
                        ${item.talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
                    </div>
                `;
                scheduleContainer.appendChild(scheduleItem);
            } else {
                if (!filter) {
                    const scheduleItem = document.createElement('div');
                    scheduleItem.className = 'schedule-item';
                    scheduleItem.innerHTML = `
                        <div class="time">${item.time}</div>
                        <h2>${item.title}</h2>
                    `;
                    scheduleContainer.appendChild(scheduleItem);
                }
            }
        });
    }

    searchBar.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});
