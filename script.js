let timer;
let totalTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button')
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

window.onload = function() {
    if (localStorage.getItem('totalTime')) {
        totalTime = parseInt(localStorage.getItem('totalTime'));
        updateDisplay();
    }
}

function startTimer() {
    if (isRunning) return;

    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    totalTime = (hours * 3600) + (minutes * 60) + seconds;
    localStorage.setItem('totalTime', totalTime);

    isRunning = true;
    timer = setInterval(countdown, 1000);
}

function countdown() {
    if (totalTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        return;
    }
    totalTime--;
    localStorage.setItem('totalTime', totalTime);
    updateDisplay();
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    totalTime = 0;
    localStorage.removeItem('totalTime');
    updateDisplay();
}

function updateDisplay() {
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;

    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);