import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // I canceled the use state for the inputs in order to use refs. 
  // - Un Controled Components - the input components will be called Un Controled Components
  // because they are not controlled by React
  // ========================================================================================

  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUserName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: "Invalid input", msg: "Non-empty values please." });
    } else if (+enteredAge < 1 || +enteredAge >= 200) {
      setError({ title: "Invalid Age", msg: "Please enter your real age." });
    } else {
      console.log(enteredUserName, enteredAge);
      const newUser = { username: enteredUserName, age: enteredAge };
      props.onAddUser(newUser);
      // setEnteredUserName("");
      // setEnteredAge("");

      nameInputRef.current.value = '';
      ageInputRef.current.value = '';


    }
  };

  // const usernameChangeHandler = (event) => setEnteredUserName(event.target.value);
  // const ageChangeHandler = (event) => setEnteredAge(event.target.value);

  const errorDismissHandler = () => setError(undefined)

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} msg={error.msg} onDismissErr={errorDismissHandler}/>}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // onChange={usernameChangeHandler}
            // value={enteredUserName}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // onChange={ageChangeHandler}
            // value={enteredAge}
            ref={ageInputRef}
          />
          <Button type="submit" >Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
