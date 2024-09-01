import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

let countdownInterval = null;
let selectedEndTime = null;

startBtn.disabled = true; 

const fp = flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      selectedEndTime = selectedDate;
      startBtn.disabled = false;
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const currentTime = new Date();
  const timeDifference = selectedEndTime - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateUI(0, 0, 0, 0);
    Notiflix.Notify.success('Countdown finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  updateUI(days, hours, minutes, seconds);
}

function updateUI(days, hours, minutes, seconds) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;
  startCountdown();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
