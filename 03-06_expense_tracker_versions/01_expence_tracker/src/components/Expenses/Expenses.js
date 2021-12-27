import React, { useState } from "react";
import ExpenceItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import "./ExpensesFilter.css";

function Expenses({ expenses }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  // const [selectedYear, setSelectedYear] = useState('All Years')
  
    const filterExpensesHandler = (year) => {
    // console.log("year: ", year)
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
  
  return (
    <Card className="expenses">
      <ExpensesFilter /*selected={selectedYear}*/ onYearFilter={filterExpensesHandler} />
      {filteredExpenses.map((el) => {
        return (
          <ExpenceItem
            key={el.id}
            title={el.title}
            amount={el.amount}
            date={el.date}
          />
        );
      })}
    </Card>
  );
}

export default Expenses;
