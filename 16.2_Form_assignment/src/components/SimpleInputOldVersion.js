import { useRef, useState, useEffect } from "react";

const SimpleInput = (props) => {
  // Generally we'll use one of the two ways dealing with user input.
  // Here I use both useState (event.target.value) and useRef (someRef.current.value) for learning purpusers.

  const inputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // Only if the input was touched and is invalid I want to treat it as invalid.
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    // Validation
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log("enteredName: ", enteredName);

    const enteredValue = inputRef.current.value;
    console.log("enteredValue: ", enteredValue.trim());

    // setTimeout(() => (inputRef.current.value = ""), 500); // Not the best approack (We tend not to manipulate the dom with React not with Vanilla JS)
    setTimeout(() => setEnteredName(""), 500); // better solution.
  };

  // const nameInputClasses = `form-control ${enteredNameIsValid ? "invalid ": ''}`;
  // const nameInputClasses = enteredNameIsValid ? 'form-control' : "form-control invalid";
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={inputRef}
          onChange={nameInputChangeHandler}
          // setting input invalid when leaving it unfinished
          onBlur={nameInputBlurHandler}
          value={enteredName} // bind when useing a state (not needed with the useRef).
        />
        {/* {!enteredNameIsValid && <p className="error-text">Name must not be empty!</p>} */}
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
