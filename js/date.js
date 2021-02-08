const dateContainer = document.querySelector('.js-date');
const day = dateContainer.querySelector('.date-day'),
    dateText = dateContainer.querySelector('.date');

const DAY_OF_WEEK = ['SNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDay() {
    const today = new Date().getDay();
    day.innerHTML = DAY_OF_WEEK[today];
}

function english_ordinal_suffix(dt) {
    return (
        dt.getDate() +
        (dt.getDate() % 10 == 1 && dt.getDate() != 11
            ? 'st'
            : dt.getDate() % 10 == 2 && dt.getDate() != 12
            ? 'nd'
            : dt.getDate() % 10 == 3 && dt.getDate() != 13
            ? 'rd'
            : 'th')
    );
}

function getDate() {
    const month = new Date().getMonth();
    let date = new Date();

    date = english_ordinal_suffix(date);

    dateText.innerHTML = `${MONTHS[month]} ${date}`;
}

function init() {
    getDay();
    getDate();
}

init();
