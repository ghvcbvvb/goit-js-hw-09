import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayInput = form.querySelector('input[name="delay"]');
const delayStepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const firstDelay = Number(firstDelayInput.value);
  const delayStep = Number(delayStepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
