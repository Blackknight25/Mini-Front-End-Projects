document.addEventListener('DOMContentLoaded', function () {
  const drumPads = document.querySelectorAll('.drum-pad');
  const display = document.getElementById('display');
  display.textContent = 'Welcome to the Drum Machine';


  function playSound(element) {
    const audio = element.querySelector('audio');
    audio.currentTime = 0;
    audio.play();
    display.textContent = event.target.dataset.text;
  }

  drumPads.forEach(pad => {
    pad.addEventListener('click', function () {
      playSound(this);
    });
  });

  document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();
    const drumPad = document.getElementById(key);
    if (drumPad) {
      playSound(drumPad);
    }
  });
});