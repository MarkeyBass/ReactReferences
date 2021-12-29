import { useState } from "react";

const SimpleInput = (props) => {
  // Here useState for handeling and validating input
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // Validation state for the whole form (Multiple inputs)
  // const [ formIsValid, setFormIsValid ] = useState(false);

  // enteredNameIsValid constant will change on every state chang (because all the component will be re rendered).
  const enteredNameIsValid = enteredName.trim() !== "";
  // Only if the input was touched and is invalid I want to treat it as invalid.
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid])

  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    // Validation
    if (!enteredNameIsValid) {
      console.log("NOT VALID");
      return;
    }

    console.log("enteredName: ", enteredName);

    // setTimeout(() => (inputRef.current.value = ""), 500); // Not the best approack (We tend not to manipulate the dom with React not with Vanilla JS)

    setTimeout(() => {
      setEnteredName("");
      setEnteredNameTouched(false);
    }, 500);
  };

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
          onChange={nameInputChangeHandler}
          // setting input invalid when leaving it unfinished
          onBlur={nameInputBlurHandler}
          value={enteredName} // bind when useing a state (not needed with the useRef).
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
