const redux = require('../../lib/redux');

/* eslint-disable no-undef */
window.onload = () => {
  const addBtn = document.getElementById('add-user');
  const userInput = document.getElementById('user-input');
  const counterValue = document.getElementById('counter');
  const usersList = document.getElementById('users-list');

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

  function users(action, state = []) {
    switch (action.type) {
      case 'ADD_USER':
        return [...state, action.payload];
      default:
        return state;
    }
  }

  const store = redux.createStore({
    counter,
    users,
  });


  function render() {
    counterValue.innerHTML = store.getState().counter;
    usersList.innerHTML = store.getState().users.map(user => `<p> ${user} </p>`);
  }

  store.subscribe(render);

  addBtn.addEventListener('click', () => {
    store.dispatch({ type: 'ADD_USER', payload: userInput.value });
    store.dispatch({ type: 'INCREMENT' });
  });
};
