// import { createStore } from "redux"; // Now with "@reduxjs/toolkit" we dont need "redux anymore"
import { createSlice, configureStore } from "@reduxjs/toolkit";
// configureStor is creating a store but making the margin of multiple reducers easier.

const initialCounterState = { counter: 0, showCounter: true };

// in the methods of the createSlice we are allowed to mutate the state. It doesn't mutate the state directly thow. There is a work around behind the scenes.
// It receives three important key value pares
// and returns a slice of the global state.

// createSlice will create unique action identifires for our different reducers - See at the bottom.
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

const initialAuthState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    logIn(state) {
      state.isAuthenticated = true
    },
    logOut(state) {
      state.isAuthenticated = false
    }
  }
});

// createSlice will create unique action identifires for our different reducers
// we can get them from this object with auto complition. // counterSlice.actions.toggleCounter();

// Those methods are called action creators. 
// They create an action object for us that have type property with uniqu identifier.
// No need to worry about unique identifiers in large projects, no need to worry about typos.




// With regular "redux":
//=====================
// We pass the reducer function of the slice (created befind the scenes) to the createStore hook
// const store = createStore(counterSlice.reducer);


// With "@reduxjs/toolkit":
//===========================
// configureStor is creating a store but making the margin of multiple reducers easier.
// We pass a configuration object to the configureStore.
// configureStore called only once.
const store = configureStore({
  // The configureStore expects only one reducer.
  // for only one state slice we can use conterSlice.reducer
  // reducer: counterSlice.reducer,

  // For bigger application with multiple state slices we'll use object. The pairs will be different reducer functions. 
  // Map of reducers. The map will be set as a value to the main reducer.
  // Behind the scenes configureStor will merge those reducers to one big reducer.
  reducer: { counter: counterSlice.reducer,  auth: authSlice.reducer }

});

// In order to provide the store to our application we go to the index.js of our application.
// Top of our conponent tree or the higest level we need


export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
