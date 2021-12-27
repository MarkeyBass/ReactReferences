import "./ExpensesList.css"
import ExpenseItem from './ExpenseItem' 

const ExpensesList = props => {
//   let expencesContent = <p className="expense-item expense-item__price">No expenses to show</p>
//   if (props.items.length > 0) {
//     expencesContent = props.items.map((el) => (
//       <ExpenseItem
//         key={el.id}
//         title={el.title}
//         amount={el.amount}
//         date={el.date}
//       />
//     ))
//   }

  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses to show</h2> 
  }
  return (
    <ul className="expenses-list">
      {/* {expencesContent} */}
      {
        props.items.map((el) => (
          <ExpenseItem
            key={el.id}
            title={el.title}
            amount={el.amount}
            date={el.date}
          />
        ))}
    </ul>
  )
};

export default ExpensesList;