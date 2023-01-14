// Global variables

var date = new Date();
let dayZero = new Date(2022, 7, 30);
let msPerHr = 60 * 60 * 1000;
let timeDayStart = 7 * msPerHr; //7AM in ms
let timeEndDay = 15 * msPerHr; // 3PM in ms
let OpenWeatherAPI = "ea2cb65ba3095201033035d36dad6948";
let lat = 42.1836377;
let lon = -71.2986695;

async function getCalendarData() {
    const url = 'calendar.json';
    const response = await fetch(url);
    return await response.json();
}

async function getRotationData() {
    const url = 'rotation.json';
    const response = await fetch(url);
    return await response.json();
}

async function getWeatherData(lat, lon) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + OpenWeatherAPI + '&units=imperial';
    const response = await fetch(url);
    return await response.json();
}

function getDateMMDDYYYY(date) {
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function dayOfWeekAsString(dayIndex) {
    return ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"][dayIndex];
}

function nameOfMonthAsString(MonthIndex) {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][MonthIndex];
}

function nameOfPeriodFromIndex(PeriodIndex) {
    return ["A", "B", "C", "D", "E", "F", "G", "Flex"][PeriodIndex];
}

function drawDigitalClock() {
    var date = new Date();
    document.getElementById("time").textContent = `${(date.getHours() - 1) % 12 + 1}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}

function setWeather(weather) {
    document.getElementById("temp").textContent = Math.round(weather.main.temp) + "° F";
    document.getElementById("weather").textContent = weather.weather[0].description;
}

function drawHeaderMaterial(calendar) {
    if (calendar[dateDiffInDays(dayZero, date)]['schedule'] == 0) {
        document.getElementById("school-day").textContent = "no school";
    } else {
        document.getElementById("school-day").textContent = "Day " + calendar[dateDiffInDays(dayZero, date)]['Day 1-8'];
    }
    document.getElementById("week-day").textContent = dayOfWeekAsString(date.getDay());
    document.getElementById("date").textContent = nameOfMonthAsString(date.getMonth()) + " " + date.getDate();
}

/* function renderLinkIcon(node) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('stroke', 'black');
    iconSvg.classList.add('post-icon');

    iconPath.setAttribute(
        'd',
        'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
    );
    iconPath.setAttribute('stroke-linecap', 'round');
    iconPath.setAttribute('stroke-linejoin', 'round');
    iconPath.setAttribute('stroke-width', '2');

    iconSvg.appendChild(iconPath);

    return node.appendChild(iconSvg);
}

function renderScheduleBar(node) {
    const scheduleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const schedulePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    scheduleSvg.setAttribute('fill', 'none');
    scheduleSvg.setAttribute('viewBox', '0 0 200 50');
    scheduleSvg.setAttribute('stroke', 'black');
    scheduleSvg.classList.add('post-schedule');

    schedulePath.setAttribute(
        'd',
        'M200,0 L200,50 L0,50 L0,0 Z'
    );

    schedulePath.setAttribute('stroke-linecap', 'round');
    schedulePath.setAttribute('stroke-linejoin', 'round');
    schedulePath.setAttribute('stroke-width', '1');

    scheduleSvg.appendChild(schedulePath);

    return node.appendChild(scheduleSvg);
} */

function dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
}

/* function renderPosts(app, posts) {
    const postNodes = posts.map((post) => {
        // Create the DOM elements
        const postCard = document.createElement('div');
        const postHeader = document.createElement('div');
        const postTitleAnchor = document.createElement('a');
        const postScheduleAnchor = document.createElement('a');
        const postTitle = document.createElement('h2');
        const postText = document.createElement('p');

        // Add some classes and attributes
        postCard.classList.add('post-card');
        postHeader.classList.add('post-header');
        postTitle.classList.add('post-title')
        postTitle.id = post.date;
        postTitleAnchor.href = '#' + post.date;
        postScheduleAnchor.href = '#' + post.date;

        // Place the text content
        postTitle.textContent = post.date;
        postText.textContent = dayOfWeekAsString(post.dayOfWeek + 1);

        // TODO: Add the icon here
        renderLinkIcon(postTitleAnchor);
        renderScheduleBar(postScheduleAnchor);

        // Put together the DOM nodes
        postHeader.appendChild(postTitleAnchor)
        postHeader.appendChild(postTitle);
        postCard.appendChild(postHeader);
        postCard.appendChild(postText);
        postCard.appendChild(postScheduleAnchor);
        app.appendChild(postCard);

        return postCard;
    });
    return postNodes;
}

async function mountPosts() {
    const app = document.querySelector('#posts');
    const cal = await getCalendarData();
    renderPosts(app, cal);
} */

function getRotationElements(rotation, rotIndex) {
    rot = nameOfPeriodFromIndex(rotation[rotIndex]['P1']) + " | " + nameOfPeriodFromIndex(rotation[rotIndex]['P2']) + " | " + nameOfPeriodFromIndex(rotation[rotIndex]['P3']) + " | " + nameOfPeriodFromIndex(rotation[rotIndex]['P4']) + " | " + nameOfPeriodFromIndex(rotation[rotIndex]['P5'])
    return rot
}

function drawRotationMaterial(calendar, rotation) {
    if (calendar[dateDiffInDays(dayZero, date)]['schedule'] != 0) {
        console.log("schedule loading")
        document.getElementById("daily-schedule").textContent = "no school";
    } else {
        let rotIndex = calendar[dateDiffInDays(dayZero, date)]['Day 1-8'];
        console.log(rotIndex)
        console.log(rotation[rotIndex])
        document.getElementById("daily-schedule").textContent = getRotationElements(rotation, rotIndex);
    }
}

async function mountHeader() {
    const cal = await getCalendarData();
    const weather = await getWeatherData(lat, lon);
    drawHeaderMaterial(cal);
    drawDigitalClock();
    setWeather(weather);
}

async function mountDailySchedule() {
    const cal = await getCalendarData();
    const rot = await getRotationData();
    drawRotationMaterial(cal, rot);
}
mountHeader();
mountDailySchedule();
// mountPosts();