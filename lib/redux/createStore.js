/*
  A root reducer is a mapping of a bunch of reducer functions
  It will look like this
  {
    users: (action, state) => state
    counter: (action, state) => state
  }
*/


function store(rootReducer) {
  function computeNewState(action, state) {
    const keys = Object.keys(rootReducer);
    let newState;

    if (keys.length > 0) {
      newState = {};
      keys.forEach((key) => {
        newState[key] = rootReducer[key](action, state[key]);
      });
    } else {
      newState = rootReducer(action, state);
    }

    return newState;
  }

  return (() => {
    const subscribers = [];
    let state = computeNewState({}, {});

    function subscribe(subscriberFunction) {
      subscribers.push(subscriberFunction);
    }

    function dispatch(action) {
      state = computeNewState(action, state);
      subscribers.forEach((subscriber) => {
        subscriber.call();
      });
    }

    function getState() {
      return state;
    }

    return {
      subscribe,
      dispatch,
      getState,
    };
  })();
}


function createStore(rootReducer) {
  return store(rootReducer);
}

module.exports = createStore;
