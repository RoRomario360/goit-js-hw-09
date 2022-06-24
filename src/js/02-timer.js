import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  closeButton: false,
});

const date = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timerId = null;

button.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.disabled = false;

      // console.log(selectedDates[0]);
    }
  },
});

button.addEventListener('click', onClickStart);

function onClickStart() {
  timerId = setInterval(() => {
    date.disabled = true;
    button.disabled = true;
    const choosenDate = new Date(date.value);
    const timeToFinish = choosenDate - Date.now();

    let { days, hours, minutes, seconds } = convertMs(timeToFinish);

    day.textContent = days < 10 ? '0' + days : days;
    hour.textContent = hours < 10 ? '0' + hours : hours;
    minute.textContent = minutes < 10 ? '0' + minutes : minutes;
    second.textContent = seconds < 10 ? '0' + seconds : seconds;

    if (timeToFinish < 1000) {
      clearInterval(timerId);

      button.disabled = true;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
