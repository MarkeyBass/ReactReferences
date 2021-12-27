import { useState } from "react";

const useInput = (validateValueHandler) => {

  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueHandler(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event, value) => {
    if(event) {
      setEnteredValue(event.target.value);
    } else {
      setEnteredValue(value);
    }
  };

  const inputBlurHandler = (event, value) => {
    if(event) {
      setIsTouched(true);
    } else {
      setIsTouched(value);
    }
  }

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}; 

export default useInput