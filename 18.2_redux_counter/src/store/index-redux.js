import { createStore }  from 'redux';

const initialState = {counter: 0, showCounter: true};

const counterReducer = (state=initialState, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
  }
  else if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }
  else if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }
  else if (action.type === 'toggle') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter
    }
  }
  
  return state;
}

const store = createStore(counterReducer);

// In order to provide the store to our application we go to the index.js of our application.
// Top of our conponent tree or the higest level we need

export default store;
