refs = {
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
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promiseDelay = promiseDelay + step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
