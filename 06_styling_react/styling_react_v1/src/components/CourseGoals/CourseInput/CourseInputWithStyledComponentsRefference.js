import React, { useState } from "react";
import styled from "styled-components";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    // Putting conditional styles insid our styled component css
    color: ${(props) => (props.invalid ? "red" : "black")};
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
    background-color: ${(props) =>
      props.invalid ? "rgb(255, 191, 184)" : "transperent"};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  /* &.invalid input {
    border-color: red;
    background-color: rgb(255, 191, 184);
  }

  &.invalid label {
    color: red;
  } */
`;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  // input validation state
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // validation
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
    setIsValid(true);
    setEnteredValue("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* Adding class name with condition in our styled component */}
      {/* <FormControl className={!isValid && "invalid"}> */}
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
          value={enteredValue}
        />
      </FormControl>

      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

// THE VERSION BEFOR USEING STYLED COMPONENT
// {
//   <div className={`form-control ${!isValid ? "invalid" : ""}`}>
//     <label
//     // inline style dinam change
//     /*style={{ color: !isValid ? "red" : "black" }}*/
//     >
//       Course Goal
//     </label>
//     <input
//       // style={{
//       //   borderColor: !isValid ? "red" : "black",
//       //   background: !isValid ? "salmon" : "transparent",
//       // }}
//       type="text"
//       onChange={goalInputChangeHandler}
//       value={enteredValue}
//     />
//   </div>
//   }
