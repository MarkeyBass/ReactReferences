// import useInput4 from "../hooks/use-input-4"; // with useReducer (from lecture) - will not work without chenging key names properly :)
// import useInput from "../hooks/use-input"; // (from lecture)
// import useInput2 from "../hooks/use-input-2"; // with useState (my hook)
import useInput3 from "../hooks/use-input-3"; // with useReducer (my hook)

const isNotEmpty = (val) => val.trim() !== "";
const isValidEmail = (mailStr) => {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(mailStr.trim());
};

const BasicForm = (props) => {
  const {
    inputValue: firstNameValue,
    isInputValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valuTouchedHandler: firstNameTouchedHandler,
    reset: firstNameClearInput,
  } = useInput3(isNotEmpty);

  const {
    inputValue: lastNameValue,
    isInputValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valuTouchedHandler: lastNameTouchedHandler,
    reset: lastNameClearInput,
  } = useInput3(isNotEmpty);

  const {
    inputValue: emailValue,
    isInputValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valuTouchedHandler: emailTouchedHandler,
    reset: emailClearInput,
  } = useInput3(isValidEmail);

  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("Error in one or more of the inputs.");
      return;
    }

    console.log("submitted!!!")
    console.log({ firstNameValue, lastNameValue, emailValue });

    firstNameClearInput();
    lastNameClearInput();
    emailClearInput();
  };

  const firstNameInputClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameTouchedHandler}
          />
          {firstNameHasError && <p className="error-text">First name must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameTouchedHandler}
          />
         {lastNameHasError && <p className="error-text">Last name must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input 
          type="text" 
          id="name" 
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailTouchedHandler}
        />
         {emailHasError && <p className="error-text" >The email is not valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
