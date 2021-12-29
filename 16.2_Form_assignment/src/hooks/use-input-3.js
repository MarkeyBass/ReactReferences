// import { useState } from "react";
import { useReducer } from "react";

const initialInputState = {
  inputValue: "",
  isInputTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      inputValue: action.inputValue,
      isInputTouched: state.isInputTouched,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      inputValue: state.inputValue,
      isInputTouched: true,
    };
  }
  if (action.type === "RESET_INPUT") {
    return initialInputState;
  }
  return initialInputState;
};

const useInput3 = (validationHandler) => {
  // const [inputValue, setInputValue] = useState("");
  // const [isInputTouched, setIsInputTouched] = useState(false);

  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isInputValid = validationHandler(inputState.inputValue);
  const hasError = !isInputValid && inputState.isInputTouched;

  const valueChangeHandler = (event) => {
    // setInputValue(event.target.value);
    dispatchInput({ type: "USER_INPUT", inputValue: event.target.value });
  };

  const valuTouchedHandler = (event) => {
    // setIsInputTouched(true);
    dispatchInput({ type: "INPUT_BLUR" });
  };

  const reset = () => {
    setTimeout(() => {
      // setIsInputTouched(false);
      // setInputValue("");
      dispatchInput({ type: "RESET_INPUT" });
    }, 300);
  };

  return {
    inputValue: inputState.inputValue,
    isInputValid,
    hasError,
    valueChangeHandler,
    valuTouchedHandler,
    reset,
  };
};

export default useInput3;
