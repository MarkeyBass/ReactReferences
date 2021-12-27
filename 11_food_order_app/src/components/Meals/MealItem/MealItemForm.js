import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
//                                                                                                value is always a string.
//                        this is the objet input element sends us with React. (like event.target.value in Vanilla js)
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; // the '+' converts the string to a number.

    // basic validation if the amount is not valid the app will output a message.
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }

    // some function we get from the father component where it managed by CartProvider and contextAPI. 
    props.onAddToCart(enteredAmountNumber);
    setAmountIsValid(true);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
      // we get the ref from the input component inside our custom Input component
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "_amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {/* Error msg */}
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
