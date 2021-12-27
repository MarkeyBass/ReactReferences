import { useSelector, useDispatch } from 'react-redux'; // to connect class based component we would import {connect} from 'redux' and wrap our class with it.

import { counterActions } from '../store/counterSlice'

import classes from './Counter.module.css';

const Counter = () => {

  const dispatch = useDispatch(); // gives a function we can execute against the Redux store

  const counter = useSelector(state => state.counter.counter);
  // When useing useSelector react will automatically set up a subscribtion to the redux store for this component (Counter.js).
  // So the component will be updated and get the latest counter when it will be updated in the redux store.
  // If the component will unmount from the dom react will clear the subscription for us.

  const showCounter = useSelector(state => state.counter.showCounter);

  const incrementHandler = () => {
    // with the createSlice of the "@reduxjs/toolkit" library we dispatch an action in a different way:
    dispatch(counterActions.increment())
    // dispatch({type: 'increment'});
  };
  
  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // reuxtoolkit will automaticly create an action object { type: SOME_UNIQ_IDENTIFIER, payload: 10 }
    // dispatch({type: 'increase', amount: 10});
  };
  
  const decrementHandler = () => {
    dispatch(counterActions.decrement())
    // dispatch({type: 'decrement'});
  };
  
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
    // dispatch({type: 'toggle'})
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{showCounter ? counter: ' _ '}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
