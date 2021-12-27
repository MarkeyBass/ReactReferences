import { createStore }  from 'redux';

const counterReducer = (state={counter: 0}, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1
    }
  }
  else if (action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  }
  
  return state;
}

const store = createStore(counterReducer);

// In order to provide the store to our application we go to the index.js of our application.
// Top of our conponent tree or the higest level we need

export default store;
