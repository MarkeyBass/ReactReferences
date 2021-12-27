import React, { useState } from 'react';
import Card from '../UI/Card';
import styles from './UserForm.module.css'
import Button from '../UI/Button';


const UserForm = props => {

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  }
  
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  }

  const submitHandler = event => {
    event.preventDefault();

    const userData = {
      userName: userName.toString(),
      age: age.toString()
    }

    if((userData.userName !== "" && userData.age !== "") && (userData.age < 150 && userData.age > 0)) {
      props.onAddUser(userData);
      console.log(userData);
      props.onSetCustomAlert('validInput'); // No alert will be shown
      
      setTimeout(() => {
        setUserName('');
        setAge('');
      }, 500);
    } else if (userData.age > 150 || userData.age < 0) {
      props.onSetCustomAlert('wrongAge');
    } else {
      props.onSetCustomAlert('noInput');
      // alert("You must fill all the sections properly");
    }


    
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className="add-user-form" id="add-user-form">
          <div className={styles['form-control']}>
            <label htmlFor="username">Username</label>
            <input type="text" value={userName} onChange={userNameChangeHandler}/>
          </div>
          <div className={styles['form-control']}>
            <label htmlFor="age">Age (Years)</label>
            <input type="number" value={age} /*min='1' max='130'*/ onChange={ageChangeHandler}/>
          </div>
          <div className={styles['form-control']}>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Card>
  );
};

export default UserForm;