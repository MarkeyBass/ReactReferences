const redux = require("redux");

// No side effects in the reducer function are allowed.
// No http request, no interaction with local storage.
// Only takes old state and produces a new state
const counterReducer = (state = { counter: 0 }, action) => {
  // reducer function must return the new state which will replace the old state.

  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  };

  return state;
};

const store = redux.createStore(counterReducer);

// console.log("Initial state: ", store.getState());

// subscribtion to the store
const counterSubscriber = () => {
  // Gives the latest state snapshot.
  const latestState = store.getState();
  console.log(latestState);
};

// Here we conect store (Redux) to the subscribtion function and tell it when the state changes.
store.subscribe(counterSubscriber);

// Dispatching an action
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });






// // In the next case case already in the initialazation of the reducer the counter would be incremented and then again when dispatching the action
// const counterReducer = (state = { counter: 0 }, action) => {
//   return {
//     counter: state.counter + 1,
//   };
// };

// store.dispatch({ type: "increment" });
