import { Component } from "react";

import { useSelector, useDispatch, connect } from "react-redux"; // to connect class based component we would import {connect} from 'redux' and wrap our class with it.

import classes from "./Counter.module.css";

// const Counter = () => {
//   const dispatch = useDispatch(); // gives a function we can execute against the Redux store

//   // selecting the exact data portion we need for this component.
//   const counter = useSelector((state) => state.counter);
//   // When useing useSelector react will automatically set up a subscribtion to the redux store for this component (Counter.js).
//   // So the component will be updated and get the latest counter when it will be updated in the redux store.
//   // If the component will unmount from the dom react will clear the subscription for us.

//   const incrementHandler = () => {
//     dispatch({ type: "increment" });
//   };
//   const decrementHandler = () => {
//     dispatch({ type: "decrement" });
//   };

//   const toggleCounterHandler = () => {};

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{counter}</div>
//       <div>
//         <button onClick={incrementHandler}>Increment</button>
//         <button onClick={decrementHandler}>Decrement</button>
//       </div>
//       <button onClick={toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   );
// };


// export default Counter;

class Counter extends Component {

  incrementHandler() {
    this.props.increment(); // we have those props thanks to mapDispatchToProps function that is set up as an argument co connect() at the bottom of the code.
  };
  decrementHandler () {
    this.props.decrement();
  };

  toggleCounterHandler() {};


  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>         {/* we have thos prop thanks to mapStateToProps function that is set up as an argument co connect() at the bottom of the code. */}
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          {/* bind() is compolsary in the class based component to bind this to the class and not to the button node. */}
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

// functions we pass directly to connect()
// first function maps redux state to props that will be passed to the component.
const mapStateToProps = state => {
  return {
    counter: state.counter // Like useSelector
  }
}

// Equivalent to useDispatch
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({type: 'increment'}),
    decrement: () => dispatch({type: 'decrement'})
  }
}

// connect() will return a new function that will receive Counter as its argument. 
// In another words, we pass the component to the returned function as an argument.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

// When setting a connect react-redux will setup a sbscription to the state (will reevaluate the component on state chang)
