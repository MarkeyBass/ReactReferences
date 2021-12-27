import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css"

//            exporting our function  importing ref from outside
const Input = React.forwardRef((props, ref) => {
  
  const inputRef = useRef();
  
  // useEffect(() => {
  //   inputRef.current.focus(); // executing method on the input element.
  // }, []); // because of the empty array the use effect will work only once at the beggining.

  // this function will be called from otside the Input componenet using the forward ref
  const activateFocus = () => { 
    inputRef.current.focus();
  }

  // this hooke anable executing method from within this function
  useImperativeHandle(ref, () => {

    // A translation object betwin inner function and the outside world
    return {
      focus: activateFocus
    }
  });
  
  return (
    <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.inputLabelText}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onValidateInput}
        />
      </div>

  );
});


export default Input
