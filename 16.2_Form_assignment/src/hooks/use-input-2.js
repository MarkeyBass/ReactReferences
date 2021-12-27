import { useState } from "react";

const useInput2 = (validationHandler) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValid = validationHandler(inputValue);
  const hasError = !isInputValid && isInputTouched;

  const valueChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const valuTouchedHandler = (event) => {
    setIsInputTouched(true);
  };


  const reset = () => {
    setTimeout(() => {
      setIsInputTouched(false);
      setInputValue("");
    }, 300);
  };

  return {
    inputValue,
    isInputValid,
    hasError,
    valueChangeHandler,
    valuTouchedHandler,
    reset,
  };
};

export default useInput2;
