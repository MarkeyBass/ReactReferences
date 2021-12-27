import React, { useState } from "react";
import ExpenceItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import "./ExpenseItem.css"
import ExpensesFilter from "./ExpensesFilter";
import "./ExpensesFilter.css";

function Expenses({ expenses }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  // const [selectedYear, setSelectedYear] = useState('All Years')
  let selectedYear;
  
  const filterExpensesHandler = (year) => {
    // console.log("year: ", year)
    // setSelectedYear((prevSelectedYear) => { return year })
    // setSelectedYear(year)
    // console.log("selectedYear: ", selectedYear)
    const selectedYear = year;

    if (selectedYear === 'All Years') {
      setFilteredExpenses(expenses)
    } else {
      const modifiedExpenses = expenses.filter(
        (el) => el.date.getUTCFullYear().toString() === selectedYear
      );
      
      setFilteredExpenses(modifiedExpenses);

    }
  };

  // Teachers concept solution
  // ===========================

  // const [selectedYear, setSelectedYear] = useState('All Years')
  
  // const filterExpensesHandler = (year) => {
  //   setSelectedYear(year);
  // };

  // let filteredExpenses; 
  // if (selectedYear === 'All Years') {
  //   filteredExpenses = expenses
  // } else {
  //   filteredExpenses = expenses.filter((el) => el.date.getUTCFullYear().toString() === selectedYear)
  // }

  let expencesContent = <p className="expense-item expense-item__price">No expenses to show</p>
  if (filteredExpenses.length > 0) {
    expencesContent = filteredExpenses.map((el) => (
      <ExpenceItem
        key={el.id}
        title={el.title}
        amount={el.amount}
        date={el.date}
      />
    ))
  }
  
  return (
    <Card className="expenses">
      <ExpensesFilter selected={selectedYear} onYearFilter={filterExpensesHandler} />
      {/* {filteredExpenses.length === 0 && expencesContent} 
      {filteredExpenses.length > 0 && filteredExpenses.map((el) => (
          <ExpenceItem
            key={el.id}
            title={el.title}
            amount={el.amount}
            date={el.date}
          />
      ))} */}
      {expencesContent}
    </Card>
  );
}

export default Expenses;
