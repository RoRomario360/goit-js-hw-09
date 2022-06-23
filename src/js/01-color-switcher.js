const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start');
const btnStop = document.querySelector('button[data-stop');
let intervalId = 0;
btnStop.disabled = true;
btnStart.addEventListener('click', () => {
  body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if ((btnStart.disabled = true)) {
    btnStop.disabled = false;
  }
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  if ((btnStop.disabled = true)) {
    btnStart.disabled = false;
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
