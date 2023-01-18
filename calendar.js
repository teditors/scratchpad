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

async function getClassData() {
    const url = 'classes.json';
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

function dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
}

function getRotationElements(P1, P2, P3, P4, P5) {
    periods = nameOfPeriodFromIndex(P1) + " | " + nameOfPeriodFromIndex(P2) + " | " + nameOfPeriodFromIndex(P3) + " | " + nameOfPeriodFromIndex(P4) + " | " + nameOfPeriodFromIndex(P5)

    return periods
}
function getClassElements(cla, P1, P2, P3, P4, P5) {
    classes = cla[P1].className + " | " + cla[P2].className + " | " + cla[P3].className + " | " + cla[P4].className + " | " + cla[P5].className
    return classes
}

function drawRotationMaterial(calendar, rotation, classes) {
    if (calendar[dateDiffInDays(dayZero, date)]['schedule'] === 0) {
        console.log("schedule loading")
        document.getElementById("daily-schedule").textContent = "no school";
    } else {
        let rotIndex = calendar[dateDiffInDays(dayZero, date)]['Day 1-8'] - 1;
        P1 = rotation[rotIndex]['P1']
        P2 = rotation[rotIndex]['P2']
        P3 = rotation[rotIndex]['P3']
        P4 = rotation[rotIndex]['P4']
        P5 = rotation[rotIndex]['P5']
        document.getElementById("daily-schedule").textContent = getRotationElements(P1, P2, P3, P4, P5);
        document.getElementById("daily-classes").textContent = getClassElements(classes, P1, P2, P3, P4, P5)
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
    const cla = await getClassData();
    drawRotationMaterial(cal, rot, cla);
}
mountHeader();
mountDailySchedule();