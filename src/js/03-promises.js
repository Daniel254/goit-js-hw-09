import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ useIcon: false });

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', submitFormHandler);

function submitFormHandler(e) {
  e.preventDefault();
  const delay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);
  const amount = parseInt(refs.amount.value);

  let promiseDelay = delay;

  for (let i = 0; i < amount; i++) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promiseDelay = promiseDelay + step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
