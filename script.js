let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
    let time = elapsedTime + (isRunning ? Date.now() - startTime : 0);
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10); // Update every 10ms
        startStopBtn.textContent = "Pause";
        startStopBtn.style.backgroundColor = "orange";
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = "Start";
        startStopBtn.style.backgroundColor = "green";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "green";
    lapsContainer.innerHTML = "";
    lapCounter = 1;
}

function addLap() {
    if (!isRunning) return;
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
    lapCounter++;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
