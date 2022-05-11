import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  dateInputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes'),
  secondsEl: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < this.config.defaultDate) {
      disableStartBtn();
      window.alert('Please choose a date in the future');
    } else {
      enableStartBtn();
    }
  },
};
let deltaTime;
const fp = flatpickr(refs.dateInputEl, options);

disableStartBtn();
refs.startBtn.addEventListener('click', startBtnClickHandler);

function startBtnClickHandler() {
  disableStartBtn();
  startTimer();
}
function startTimer() {
  const intervalId = setInterval(
    (function tick() {
      deltaTime = fp.selectedDates[0].getTime() - Date.now();
      if (deltaTime < 0) {
        clearInterval(intervalId);
        return;
      }
      renderTimer(convertMs(deltaTime));
      return tick;
    })(),
    1000,
  );
}
function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}
function addLeadingZero(number) {
  return String(number).padStart(2, '0');
}
function enableStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}
function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', true);
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
