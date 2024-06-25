document.addEventListener("DOMContentLoaded", function () {
  const time = document.getElementById("time-left");
  const sessionTime = document.getElementById("session-length");
  const breakTime = document.getElementById("break-length");
  const timeLeftElement = document.getElementById("time-left");
  const incSeshButton = document.getElementById("session-increment");
  const decSeshButton = document.getElementById("session-decrement");
  const incBreakButton = document.getElementById("break-increment");
  const decBreakButton = document.getElementById("break-decrement");
  const playButton = document.getElementById("start_stop");
  const resetButton = document.getElementById("reset");
  const timerLabel = document.getElementById("timer-label");
  const beepSound = document.getElementById("beep");

  sessionTime.textContent = "25";
  breakTime.textContent = "5";
  timerLabel.textContent = "Session";

  let displayTime = parseInt(sessionTime.textContent) * 60;
  let isSession = true;
  let isRunning = false;
  let timerInterval;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.
    toString().
    padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function updateDisplay() {
    timeLeftElement.textContent = formatTime(displayTime);
  }

  function incrementSession() {
    if (!isRunning) {
      if (parseInt(sessionTime.textContent) < 60) {
        let sessionLength = parseInt(sessionTime.textContent);
        sessionLength++;
        sessionTime.textContent = sessionLength.toString();
        displayTime = sessionLength * 60;
        updateDisplay();
      }
    }
  }

  function decrementSession() {
    if (!isRunning) {
      if (parseInt(sessionTime.textContent) > 1) {
        let sessionLength = parseInt(sessionTime.textContent);
        sessionLength--;
        sessionTime.textContent = sessionLength.toString();
        displayTime = sessionLength * 60;
        updateDisplay();
      }
    }
  }

  function incrementBreak() {
    if (!isRunning) {
      if (parseInt(breakTime.textContent) < 60) {
        let breakLength = parseInt(breakTime.textContent);
        breakLength++;
        breakTime.textContent = breakLength.toString();
        updateDisplay();
      }
    }
  }

  function decrementBreak() {
    if (!isRunning) {
      if (parseInt(breakTime.textContent) > 1) {
        let breakLength = parseInt(breakTime.textContent);
        breakLength--;
        breakTime.textContent = breakLength.toString();
        updateDisplay();
      }
    }
  }
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timerInterval = setInterval(() => {
        if (displayTime > 0) {
          displayTime--;
          updateDisplay();
        } else {
          beepSound.currentTime = 0;
          beepSound.play();
          switchTimer();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
    }
  }

  function resetTimer() {
    stopTimer();
    timerLabel.textContent = "Session";
    if (!isSession) {
      switchTimer();
    }
    sessionTime.textContent = 25;
    breakTime.textContent = 5;
    displayTime = parseInt(sessionTime.textContent) * 60;
    updateDisplay();
    beepSound.pause();
    beepSound.currentTime = 0;
  }

  function switchTimer() {
    if (isSession) {
      isSession = false;
      timerLabel.textContent = "Break";
      let breakLength = parseInt(breakTime.textContent);
      displayTime = breakLength * 60;
    } else {
      isSession = true;
      timerLabel.textContent = "Session";
      let sessionLength = parseInt(sessionTime.textContent);
      displayTime = sessionLength * 60;
    }
    updateDisplay();
  }

  incSeshButton.addEventListener("click", incrementSession);
  decSeshButton.addEventListener("click", decrementSession);
  incBreakButton.addEventListener("click", incrementBreak);
  decBreakButton.addEventListener("click", decrementBreak);
  resetButton.addEventListener("click", resetTimer);
  playButton.addEventListener("click", () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });
  updateDisplay();
});