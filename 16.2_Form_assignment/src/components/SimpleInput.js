import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(nameValidationHandler);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(emailValidationHandler);

  function nameValidationHandler(nameToValidate) {
    return nameToValidate.trim() !== "";
  }

  function emailValidationHandler(mailToValidate) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return mailformat.test(mailToValidate.trim());
  }

  
  let formIsValid = false;
    if (enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
    }
    
    const submitHandler = (event) => {
      event.preventDefault();
      
      // Form Validation
      if (emailInputHasError || nameInputHasError) {
        return;
      }
      
      console.log({ enteredName, enteredEmail });
      
      // cleaning inputs:
      setTimeout(() => {
        resetName();
        resetEmail();
      }, 500);
    };

    const nameInputClasses = nameInputHasError
      ? "form-control invalid"
      : "form-control";
  
    const emailInputClasses = emailInputHasError
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail} 
        />
        {emailInputHasError && (
          <p className="error-text">"You have entered an invalid email address!"</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
