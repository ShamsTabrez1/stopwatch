let timer;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let running = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesContainer = document.getElementById('lapTimes');

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(updateTime, 10); // Update every 10ms
    }
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapTimesContainer.innerHTML = '';
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(Math.floor(milliseconds / 10));
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function recordLap() {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(Math.floor(milliseconds / 10))}`;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    lapTimesContainer.appendChild(li);
}
