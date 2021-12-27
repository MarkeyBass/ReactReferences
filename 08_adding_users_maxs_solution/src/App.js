import React, { useState } from 'react';
import UsersList from './components/Users/UsersList'
import AddUser from './components/Users/AddUser';


function App() {

  const [usersList, setUsersList] = useState([
    {username: 'Mark', age:36, key: "1"},
    {username: 'Arthur', age:33, key: "2"},
  ]);

  const uniquKeyHandler = () => {
    let newKey = 1;
    let isNotUnique = true;

    while (isNotUnique) {
      if (!usersList.find((el) => el.key === newKey.toString())) {
        isNotUnique = false;
      } else {
        newKey++;
      }
    }

    console.log(newKey);

    return newKey.toString();
  };


  const addUserHandler = (newUser) => {
    newUser.key = uniquKeyHandler();
    setUsersList(prevUsersList => [...prevUsersList, newUser]);
    // console.log("usersList from App.js: ", usersList);
  }

  const deleteUserHandler = (userKey) => {
    console.log("userKey: " + userKey);
    setUsersList((prevUsersList) => {
      const updatedUsers = prevUsersList.filter((user) => user.key !== userKey);
      return updatedUsers;
    });
  };

  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler}/>
      <UsersList users={usersList} onDeleteUser={deleteUserHandler}/>
    </React.Fragment>
  );
}

export default App;
