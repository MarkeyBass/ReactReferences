import { useRef, useState } from "react";

import styles from "./Checkout.module.css";

// validation functions
const isEmpty = (val) => val.trim() === "";
const isValidFullName = (val) => val.trim().length > 2;
const isValidHouseNum = (val) => {
  const houseNumber = Number.isInteger(val * 1);
  return houseNumber && val * 1 > 0 && val * 1 < 10000;
};
const isValidPostal = (val) => {
  const postalNumber = Number.isInteger(val * 1);
  return postalNumber && val.trim().length === 7; // In Israel postal code is 7 digits
};

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    fullName: true,
    street: true,
    houseNumber: true,
    city: true,
    postal: true,
  });

  const fullNameInputRef = useRef();
  const streetInputRef = useRef();
  const houseNumberInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredFullName = fullNameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredHouseNumber = houseNumberInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredFullNameIsValid = isValidFullName(enteredFullName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const houseNumberIsValid = isValidHouseNum(enteredHouseNumber);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isValidPostal(enteredPostal);

    setFormInputsValidity({
      fullName: enteredFullNameIsValid,
      street: enteredStreetIsValid,
      houseNumber: houseNumberIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });

    const formIsValid =
      enteredFullNameIsValid &&
      enteredStreetIsValid &&
      houseNumberIsValid &&
      cityIsValid &&
      postalIsValid;

    if (!formIsValid) {
      console.log("Error in one or more of the inputs.", formIsValid);
      return;
    }

    const mailingInfo = {
      fullName: enteredFullName,
      street: enteredStreet,
      houseNumber: enteredHouseNumber,
      city: enteredCity,
      postal: enteredPostal,
    };

    // console.log(mailingInfo);
    props.onSubmitOrder(mailingInfo);
    console.log("submitted!!!");
  };

  const fullNameControlStyles = `${styles.control} ${
    formInputsValidity.fullName ? "" : styles.invalid
  }`;
  const streetControlStyles = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;
  const houseNumberControlStyles = `${styles.control} ${
    formInputsValidity.houseNumber ? "" : styles.invalid
  }`;
  const cityControlStyles = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;
  const postalControlStyles = `${styles.control} ${
    formInputsValidity.postal ? "" : styles.invalid
  }`;

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={fullNameControlStyles}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" ref={fullNameInputRef} />
        {!formInputsValidity.fullName && (
          <p>Pleas enter a valid name!</p>
        )}
      </div>
      <div className={streetControlStyles}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && (
          <p>Pleas enter a valid street!</p>
        )}
      </div>
      <div className={houseNumberControlStyles}>
        <label htmlFor="houseNumber">House Number</label>
        <input ref={houseNumberInputRef} type="text" id="houseNumber" />
        {!formInputsValidity.houseNumber && (
          <p>Pleas enter a valid house number!</p>
        )}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && (
          <p>Pleas enter a valid city!</p>
        )}
      </div>
      <div className={postalControlStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postal && (
          <p>Pleas enter a valid postal code!</p>
        )}
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
