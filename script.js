let timer;
let isRunning = false;
let startTime;
let totalElapsedMilliseconds = 0;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 10); // Update every 10 milliseconds for millisecond accuracy
        isRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    totalElapsedMilliseconds += new Date().getTime() - startTime;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('time-display').innerText = '00:00:00.000';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    totalElapsedMilliseconds = 0;
    lapTimes = [];
    updateLapList();
}

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedMilliseconds = currentTime - startTime + totalElapsedMilliseconds;
    const formattedTime = formatTime(elapsedMilliseconds);
    document.getElementById('time-display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = padZero(hours);
    const formattedMinutes = padZero(minutes % 60);
    const formattedSeconds = padZero(totalSeconds % 60);
    const formattedMilliseconds = padZero(milliseconds % 1000, 3);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function padZero(num, length = 2) {
    let paddedNum = String(num);
    while (paddedNum.length < length) {
        paddedNum = '0' + paddedNum;
    }
    return paddedNum;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.getElementById('time-display').innerText;
        lapTimes.push(lapTime);
        updateLapList();
    }
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lap, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(listItem);
    });
}
