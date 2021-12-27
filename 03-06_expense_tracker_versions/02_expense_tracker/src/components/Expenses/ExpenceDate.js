import './ExpenseDate.css'

function ExpenseDate(props) { //      <can be default as well>
  const month = props.date.toLocaleString("heb", { month: "long" });
  const day = props.date.toLocaleString("us-EN", { month: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__day">{day}</div>
      <div className="expense-date__year">{year}</div>
    </div>
  );
}

export default ExpenseDate;
