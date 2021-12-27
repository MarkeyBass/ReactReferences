import React, { useState } from "react";

import ExpenseDate from "./ExpenceDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";


function ExpenseItem(props) {
  const [title, setTitle] = useState(props.title); // React Hook that is called inside a component function
  // we provide it with a prop value we would like to manipulate.
  // usestate returns the value itself and a setter to this prop value.
  // this allows us to change the state

  const changeTitleHandler = (e) => {
    setTitle("Updated!!!");
    console.log("Clicked", e.target, title);
  };

  return (

      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
        </div>
        <div className="expense-item__price">{props.amount}$</div>
        <button onClick={changeTitleHandler} className="expense-item__btn">
          Change Title
        </button>
      </Card>

  );
}

export default ExpenseItem;
