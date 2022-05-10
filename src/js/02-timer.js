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
    // console.log(selectedDates[0].getTime());
    // console.log('defaultDate', this);
    if (selectedDates[0] < this.config.defaultDate) {
      refs.startBtn.setAttribute('disabled', true);
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

let timerIsEnabled = false;
const fp = flatpickr(refs.dateInputEl, options);

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', startBtnClickHandler);

function startBtnClickHandler() {
  if (timerIsEnabled) {
    return;
  }
  setInterval(() => {
    renderTimer(convertMs(fp.selectedDates[0].getTime() - Date.now()));
  }, 1000);
  timerIsEnabled = true;
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
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
