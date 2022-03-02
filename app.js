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

function addCurrentDateInput() {
    let stringDate = today.toLocaleDateString()
    screenInput.value = `${stringDate} ${currentHour}:${currentMinute}`
    let monthName = months[currentMonth]
    selectedMonthYear.textContent = `${monthName} ${currentYear}`
}

addCurrentDateInput()

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
            prevDay.addEventListener('click', () => makeCurrent(prevDay))
            tableDays.appendChild(prevDay)
            prevDayCount += 1
        }
    }
    for (let i = 0; i < dayCount; i++) {
        let dayNum = document.createElement('div')
        dayNum.textContent = i + 1
        dayNum.setAttribute('id', 'uptodate')
        tableDays.appendChild(dayNum)
        dayNum.addEventListener('click', () => makeCurrent(dayNum))
        // if (i + 1 == currentDate) {
        //     dayNum.setAttribute('class', 'current')
        // }
    }
    let daysCount = prevDayCount + lastDay
    let nextMonthDay = null
    while (daysCount % 7 > 0) {
        let nextDay = document.createElement('div')
        nextMonthDay += 1
        nextDay.textContent = nextMonthDay
        nextDay.setAttribute('id', 'next')
        nextDay.addEventListener('click', () => makeCurrent(nextDay))
        tableDays.appendChild(nextDay)
        daysCount += 1
    }
}

function makeCurrent(e) {
    let selectCurrent = document.querySelector('.current')
    selectCurrent.removeAttribute('class')
    e.setAttribute('class', 'current')
    console.log(e.textContent)
    // if (e.className == 'previous') {
    //     previousMonth()
    // }
    // else if (e.className == 'next') {
    //     nextMonth()
    // }
}

daysOfMonth()

//mark current day - set class = current
function getCurrent() {
    let cd = document.querySelectorAll('#uptodate')
    cd.forEach(c => {
        if (c.textContent == currentDate) {
            c.setAttribute('class', 'current')
        }
    })
}
getCurrent()

//prev-next
previousBtn.addEventListener('click', previousMonth)
function previousMonth() {
    let lastCurrent = document.querySelector('.current').textContent
    while (tableDays.firstChild) {
        tableDays.removeChild(tableDays.lastChild);
    }
    currentMonth = (today.getMonth() + 11) % 12
    if (currentMonth == 11) {
        currentYear -= 1
        today.setFullYear(currentYear)
    }
    today.setMonth(currentMonth)
    daysOfMonth()
    let newCurrent = document.querySelectorAll('#uptodate')
    newCurrent.forEach(day => {
        if (day.textContent == lastCurrent) {
            day.setAttribute('class', 'current')
        }
    })
    addCurrentDateInput()
    changeTime()
}


nextBtn.addEventListener('click', nextMonth)
function nextMonth() {
    let lastCurrent = document.querySelector('.current').textContent

    while (tableDays.firstChild) {
        tableDays.removeChild(tableDays.lastChild);
    }
    currentMonth = (today.getMonth() + 1) % 12
    if (currentMonth == 0) {
        currentYear += 1
        today.setFullYear(currentYear)
    }
    today.setMonth(currentMonth)
    daysOfMonth()

    let newCurrent = document.querySelectorAll('#uptodate')
    let newDayCount = new Date(currentYear, currentMonth + 1, 0).getDate()
    if (lastCurrent > newDayCount) {
        for (let x = 0; x < newDayCount; x++) {
            if (newCurrent[x].textContent == newDayCount) {
                newCurrent[x].setAttribute('class', 'current')
            }

        }
    }
    newCurrent.forEach(day => {
        if (day.textContent == lastCurrent) {
            day.setAttribute('class', 'current')
        }
    })

    addCurrentDateInput()
    changeTime()
}