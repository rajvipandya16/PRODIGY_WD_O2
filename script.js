let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const restartButton = document.getElementById('restart');
const lapButton = document.getElementById('lap');
const resetLapsButton = document.getElementById('resetLaps');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
restartButton.addEventListener('click', restart);
lapButton.addEventListener('click', recordLap);
resetLapsButton.addEventListener('click', resetLaps);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = "00:00:00.000";
    resetLaps();
}

function restart() {
    reset();
    start();
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

function resetLaps() {
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
