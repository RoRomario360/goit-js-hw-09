import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//
const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
let interval = 0;
btnStart.disabled = true;

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  closeButton: false,
});

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Hey Bro, please enter valid date!!!');
      // alert('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
});

btnStart.addEventListener('click', onClickStart);

function onClickStart(event) {
  timerId = setInterval(() => {
    const choosenDate = new Date(inputDate.value);
    const timeToFinish = choosenDate - Date.now();

    let { days, hours, minutes, seconds } = convertMs(timeToFinish);
    btnStart.disabled = true;
    day.textContent = days < 10 ? '0' + days : days;
    hour.textContent = hours < 10 ? '0' + hours : hours;
    minute.textContent = minutes < 10 ? '0' + minutes : minutes;
    second.textContent = seconds < 10 ? '0' + seconds : seconds;

    if (timeToFinish < 1000) {
      clearInterval(timerId);
      btnStart.disabled = true;
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

//lib

// const timer = {
//   start() {
//     const startTime = Date.now();
//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const timerComponents = getTimeComponents(deltaTime);
//       console.log(timerComponents);
//     }, 1000);
//   },
// };
// // timer.start();

// //Function from Repeta
// function getTimeComponents(time) {
//   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//   const secs = Math.floor((time % (1000 * 60)) / 1000);

//   return { hours, mins, secs };
// }
