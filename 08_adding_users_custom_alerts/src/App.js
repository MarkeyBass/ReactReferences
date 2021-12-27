import { useState } from "react";
import "./App.css";

import UserForm from "./components/UserForm/UserForm";
import UserList from "./components/UserList/UserList";
import CustomAlert from "./components/CustomAlert/CustomAlert";

function App() {
  const initialUsers = [
    { userName: "User 1", age: 30, key: "1" },
    { userName: "User 2", age: 15, key: "2" },
    { userName: "User 3", age: 45, key: "3" },
    { userName: "User 4", age: 65, key: "4" },
  ];

  const [users, setUsers] = useState(initialUsers);
  console.log(users);

  // States: "validInput", "noInput", "wrongAge"
  const [displayState, setDisplayState] = useState("validInput");

  const uniquKeyHandler = () => {
    let newKey = 1;
    let isNotUnique = true;

    while (isNotUnique) {
      if (!users.find((el) => el.key === newKey.toString())) {
        isNotUnique = false;
      } else {
        newKey++;
      }
    }

    console.log(newKey);

    return newKey.toString();
  };

  const addUserHandler = (userInfo) => {
    setUsers((prevUsers) => {
      const userData = { ...userInfo };
      const key = uniquKeyHandler();
      userData.key = key;
      const userArr = [...prevUsers];
      return [...userArr, userData];
    });
  };

  const deleteUserHandler = (userKey) => {
    console.log("userKey: " + userKey);
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.key !== userKey);
      return updatedUsers;
    });
  };

  const customAlertHandler = (display) => {
    setDisplayState(display);
  }

  const removeAlertHandler = () => setDisplayState('validInput');

  const outputBlock_1 = /*(displayState === 'validInput') ? 
    <UserForm onAddUser={addUserHandler} onSetCustomAlert={customAlertHandler} /> : */ 
    (displayState === 'noInput') ?
    <CustomAlert msg_1="No input was inserted" msg_2="You must fill all the sections properly" onRemoveAlert={removeAlertHandler}/> :
    (displayState === 'wrongAge') ? 
    <CustomAlert msg_1='Imposible Age' msg_2="Pleas insert age between (1 - 149)" onRemoveAlert={removeAlertHandler}/> :
    <UserForm onAddUser={addUserHandler} onSetCustomAlert={customAlertHandler} /> ;

  return (
    <div className="App">
      {/* <UserForm onAddUser={addUserHandler} onSetCustomAlert={customAlertHandler}/> */}
      {outputBlock_1}
      <UserList items={users} onDeleteUser={deleteUserHandler} />
    </div>
  );
}

export default App;
