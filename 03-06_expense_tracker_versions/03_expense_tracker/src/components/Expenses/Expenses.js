import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpensesChart from "./ExpensesChart";

function Expenses({ expenses }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  let selectedYear;
  
  const filterExpensesHandler = (year) => {
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


  
  return (
    <Card className="expenses">
      <ExpensesFilter selected={selectedYear} onYearFilter={filterExpensesHandler} />
      <ExpensesChart expenses={filteredExpenses}/>
      <ExpensesList items={filteredExpenses}/>
    </Card>
  );
}

export default Expenses;
