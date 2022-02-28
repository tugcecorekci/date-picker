const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

const showScreen = document.querySelector('#showScreen')
const previousBtn = document.querySelector('#left')
const nextBtn = document.querySelector('#right')

let selectedMonthYear = document.querySelector('h1')
let showTime = document.querySelector('#showTime')

//current date and time - screen
let today = new Date()
let currentYear = today.getFullYear()
let currentMonth = today.getMonth()
let currentDay = today.getDay()
let currentHour = today.getHours()
let currentMinute = String(today.getMinutes()).padStart(2, '0')
let currentSec = String(today.getSeconds()).padStart(2, '0')

function currentDateTime() {
    let yo = today.toLocaleDateString()
    showScreen.value = `${yo} ${currentHour}:${currentMinute}`
    let monthName = months[currentMonth]
    selectedMonthYear.textContent = `${monthName} ${currentYear}`
}

currentDateTime()

