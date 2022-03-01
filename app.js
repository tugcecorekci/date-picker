const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

let screenInput = document.querySelector('#screenInput')
const previousBtn = document.querySelector('#left')
const nextBtn = document.querySelector('#right')

let selectedMonthYear = document.querySelector('h1')
let screenTime = document.querySelector('#screenTime')

//current date and time - screen
let today = new Date()
let currentYear = today.getFullYear()
let currentMonth = today.getMonth()
let currentDate = today.getDate()
let currentDay = today.getDay()
let currentHour = today.getHours()
let currentMinute = String(today.getMinutes()).padStart(2, '0')

//screening current date

function addCurrentDate() {
    let stringDate = today.toLocaleDateString()
    screenInput.value = `${stringDate} ${currentHour}:${currentMinute}`
    let monthName = months[currentMonth]
    selectedMonthYear.textContent = `${monthName} ${currentYear}`
}

addCurrentDate()

//adding current time to screenInput

function addCurrentTime() {
    let newTime = document.createElement('option')
    newTime.setAttribute('selected', true)
    newTime.textContent = `${currentHour}:${currentMinute}`
    screenTime.append(newTime)
}

addCurrentTime()

//screentime change event
screenTime.addEventListener('change', changeTime)

function changeTime() {
    //selected date ekle
    screenTime = document.querySelector('#screenTime')
    let stringDate = today.toLocaleDateString()
    screenInput.value = `${stringDate} ${screenTime.value}`
}

//aylık görünüm
let tableDays = document.querySelector('.days')

function daysOfMonth() {
    let dayCount = new Date(currentYear, currentMonth + 1, 0).getDate()
    let firstDay = new Date(currentYear, currentMonth, 1).getDay()
    let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate()
    let prevDayCount = null
    if (firstDay > 0) {
        for (let j = firstDay; j > 0; j--) {
            let prevDay = document.createElement('div')
            prevDay.textContent = new Date(currentYear, currentMonth, 0).getDate() - j + 1
            prevDay.setAttribute('id', 'previous')
            tableDays.appendChild(prevDay)
            prevDayCount += 1
        }
    }
    for (let i = 0; i < dayCount; i++) {
        let dayNum = document.createElement('div')
        dayNum.textContent = i + 1
        tableDays.appendChild(dayNum)
        if (i + 1 == currentDate) {
            dayNum.setAttribute('class', 'current')
        }
    }
    let daysCount = prevDayCount + lastDay
    let nextMonthDay = null
    while (daysCount % 7 > 0) {
        let nextDay = document.createElement('div')
        nextMonthDay += 1
        nextDay.textContent = nextMonthDay
        nextDay.setAttribute('id', 'next')
        tableDays.appendChild(nextDay)
        daysCount += 1
    }
}

daysOfMonth()

//prev-next
previousBtn.addEventListener('click', previousMonth)
function previousMonth() {
    while (tableDays.firstChild) {
        tableDays.removeChild(tableDays.lastChild);
    }
    currentMonth = (today.getMonth() + 11) % 12
    today.setMonth(currentMonth)
    daysOfMonth()
    addCurrentDate()
    changeTime()
}

nextBtn.addEventListener('click', nextMonth)
function nextMonth() {
    while (tableDays.firstChild) {
        tableDays.removeChild(tableDays.lastChild);
    }
    currentMonth = (today.getMonth() + 1) % 12
    today.setMonth(currentMonth)
    daysOfMonth()
    addCurrentDate()
    changeTime()
}