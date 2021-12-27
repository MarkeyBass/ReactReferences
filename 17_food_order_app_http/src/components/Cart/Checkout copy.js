import styles from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

// validation functions
const isValidName = (val) => {
  console.log(val.trim().length > 2);
  return val.trim().length > 2;
};
const isHouseNumValid = (val) => {
  const houseNumber = Number.isInteger(val * 1);
  return houseNumber && val * 1 > 0 && val * 1 < 10000;
};
const isValidPostal = (val) => {
  const postalNumber = Number.isInteger(val * 1);
  return postalNumber && val * 1 > 10000;
};

const Checkout = (props) => {
  const {
    inputValue: fullNameValue,
    isInputValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    valuTouchedHandler: fullNameTouchedHandler,
    reset: fullNameClearInput,
  } = useInput(isValidName);

  let formIsValid = fullNameIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("Error in one or more of the inputs.", formIsValid);
      return;
    }

    console.log("submitted!!!");
    console.log({ fullNameValue });

    fullNameClearInput();
  };

  const fullNameInputClasses = fullNameHasError
    ? `${styles["control"]} ${styles["invalid"]}`
    : styles["control"];

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={fullNameInputClasses}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={fullNameValue}
          onChange={fullNameChangeHandler}
          onBlur={fullNameTouchedHandler}
        />
        {fullNameHasError && (
          <p className={styles["error-text"]}>
            Full Name must be tonger the two letters
          </p>
        )}
      </div>
      <div className={styles["control"]}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={styles["control"]}>
        <label htmlFor="housNumber">Hous Nomber</label>
        <input type="text" id="housNumber" />
      </div>
      <div className={styles["control"]}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div className={styles["control"]}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
