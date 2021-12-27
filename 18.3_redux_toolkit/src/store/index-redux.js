// import { createStore } from "redux"; // Now with "@reduxjs/toolkit" we dont need "redux anymore"
import { configureStore } from "@reduxjs/toolkit";
// configureStor is creating a store but making the margin of multiple reducers easier.

import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

// With regular "redux":
//=====================
// We pass the reducer function of the slice (created behind the scenes) to the createStore hook
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
  reducer: { counter: counterReducer, auth: authReducer },
});

// In order to provide the store to our application we go to the index.js of our application.
// Top of our conponent tree or the higest level we need

export default store;
