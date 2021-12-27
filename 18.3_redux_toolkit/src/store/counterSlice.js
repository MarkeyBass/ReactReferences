import { createSlice} from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// in the methods of the createSlice we are allowed to mutate the state. It doesn't mutate the state directly thow. There is a work around behind the scenes.
// It receives three important key value pares
// and returns a slice of the global state.

// createSlice will create unique action identifires for our different reducers - See at the bottom.
// we can get them from this object with auto complition. // counterSlice.actions.toggleCounter();

// Those methods are called action creators. 
// They create an action object for us that have type property with uniqu identifier.
// No need to worry about unique identifiers in large projects, no need to worry about typos.


const counterSlice = createSlice({
  // Name of the state slice
  name: "counter",
  // Initial state
  initialState: initialCounterState,
  // reducer methods
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {         // payload is a saved name for the action payload passed to the reducer function.
      state.counter = state.counter + action.payload
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  },
});

export const counterActions = counterSlice.actions;


export default counterSlice.reducer;