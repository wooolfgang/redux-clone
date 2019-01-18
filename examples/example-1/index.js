
const redux = require('../../lib/redux');

/* eslint-disable no-undef */

window.onload = () => {
  const increaseBtn = document.getElementById('increment');
  const decreaseBtn = document.getElementById('decrement');
  const counterValue = document.getElementById('counter');

  function counter(action, state = 0) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }

  const store = redux.createStore(counter);
  function render() {
    counterValue.innerHTML = store.getState();
  }

  render();
  store.subscribe(render);

  increaseBtn.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });

  decreaseBtn.addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' });
  });
};
