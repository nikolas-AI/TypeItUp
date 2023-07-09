var WRAPPER = document.querySelector(".test-wrapper");
var TESTAREA = document.querySelector("#test-area");
var ORIGINTEXT = document.querySelector('#origin-text p').innerHTML;
var RESET = document.querySelector("#reset");
var TIMER = document.querySelector(".timer");

var time = [0,0,0,0];
var stop;
var timerRunning = false;

function addZero(timeStr) {
    if (timeStr <= 9) {
        timeStr = "0" + timeStr;
    }
    return timeStr;

}

function runTimer() {
    let currentTime = addZero(time[0]) + ":" + addZero(time[1]) + ":" + addZero(time[2]);
    TIMER.innerHTML = currentTime;
    time[3]++;

    time[0] = Math.floor((time[3]/100)/60);
    time[1] = Math.floor(time[3]/100) - (time[0]*60);
    time[2] = Math.floor(time[3] - (time[1]*100) - time[0]*6000);
}

function spellCheck() {
    let text = TESTAREA.value;
    let ogTextMatch = ORIGINTEXT.substring(0, text.length)

    if (text == ORIGINTEXT) {
        WRAPPER.style.borderColor = "#00f90c";
        clearInterval(stop);
    }
    else {
        if (text == ogTextMatch) {
            WRAPPER.style.borderColor = "#00e8f9";
        }
        else {
            WRAPPER.style.borderColor = '#f90000'
        }
    }
}


function start() {
    let textLength = TESTAREA.value.length;
    if (textLength === 0 && !timerRunning) {
        timerRunning = true;
        stop = setInterval(runTimer, 10);
    }
}

function reset() {
    clearInterval(stop);
    stop = null;
    time = [0,0,0,0];
    timerRunning = false;

    TESTAREA.value = "";
    TIMER.innerHTML = "00:00:00"
    WRAPPER.style.borderColor = "rgb(50, 39, 93)"

}


TESTAREA.addEventListener("keypress", start, false);
TESTAREA.addEventListener("keyup", spellCheck, false);
RESET.addEventListener("click", reset, false);