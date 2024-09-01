const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let colorInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startColorSwitcher() {
  startBtn.disabled = true;
  
  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitcher() {
  clearInterval(colorInterval);
  
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

