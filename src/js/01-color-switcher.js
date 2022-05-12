refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};

let intervalId = null;
refs.startBtn.addEventListener('click', () => startSwitherHandler());
refs.stopBtn.addEventListener('click', () => stopSwitherHandler());

function startSwitherHandler() {
  refs.startBtn.setAttribute('disabled', true);
  switchBackgroundColor();
  intervalId = setInterval(() => {
    switchBackgroundColor();
  }, 1000);
}

function stopSwitherHandler() {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchBackgroundColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}
