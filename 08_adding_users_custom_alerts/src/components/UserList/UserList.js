// import React, { useState } from "react";
import Card from "../UI/Card";
import UserItem from "../UserItem/UserItem";
import styles from './UserList.module.css'
import stylesItem from "../UserItem/UserItem.module.css";

const UserList = (props) => {

  return (
    <Card >
      <ul className={styles["user-list"]} id="users-list">
        {props.items.map((user) => {
          const text = `${user.userName} ${user.age} (years)`
          return (
            <UserItem key={user.key}>
              {text}
              <button 
                className={stylesItem.deleteme}
                onClick={() => props.onDeleteUser(user.key)}
              >X
              </button>
            </UserItem>
          );
        })}
      </ul>
    </Card>
  );
};

export default UserList;
