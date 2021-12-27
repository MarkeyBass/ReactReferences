import { useState } from 'react'

import './ExpenseForm.css'

const ExpenseForm = (props) => {

    // COMBINED STATE CHANGE APPROACH -
  // ================================== 
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '', 
  //   enteredDate: ''
  // });

  // const titleChangedHandler = (event) => {
  //   // setUserInput({ ...userInput, enteredTitle: event.target.value });
  //   // This callbacke function is a better approach in the inner react workflow because react resquduals the state -
  //   // this approach will make sure that only latest state was updated and not any other older. 
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredTitle: event.target.value }
  //   });
  // };
  // const amountChangeHandler = (event) => {
  //   setUserInput((prevState) => {return { ...prevState, enteredAmount: event.target.value }});
  // };
  // const dateChangeHandler = (event) => {
  //   setUserInput((prevState) => { return {...prevState, enteredDate: event.target.value }});
  // };

  const [displayForm, setDisplayForm] = useState(false);

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');


  const titleChangedHandler = (event) => {
    // console.log("Title changed: ", event.target.value);
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };



  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };

    // props.onSaveExpenseData(expenseData);
    if(expenseData.title !== "" && expenseData.amount !== 0 && !isNaN(expenseData.date)) {
      props.onSaveExpenseData(expenseData);
      
      console.log(expenseData)
    } else {
      alert("You must fill all the sections properly");
    }

    
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  }
  
  const showFormBtnHTML = <div className="add-new-expense__btn_wrap" >
      <div className="new-expense__controls">
      <div className="new-expense__actions">
      <button type="submit" onClick={() => setDisplayForm(true)}>Add New Expense</button>
        </div>
      </div>
    </div>

  const theFormHTML = <form onSubmit={submitHandler}>
    <div className="new-expense__controls">
      <div className="new-expense__control">
        {/* onInput - listening to chang of every key stroke
        onChang - good for all input types including drop downs*/}
        <label>Title</label>
        <input
          type="text" 
          value={enteredTitle} 
          onChange={titleChangedHandler}
        />
      </div>
      <div className="new-expense__control" >
        <label>Amount</label>
        <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler} />
      </div>
      <div className="new-expense__control" >
        <label>Date</label>
        <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler} />
      </div>
    </div>

    <div className="new-expense__btn_wrap" >
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
      <div className="new-expense__actions">
        <button onClick={() => setDisplayForm(false)}>Cancle</button>
      </div>
    </div>
  </form>
 
  return (
    <div>
      {displayForm === false && showFormBtnHTML}
      {displayForm === true && theFormHTML}
    </div>
  );
}

export default ExpenseForm;