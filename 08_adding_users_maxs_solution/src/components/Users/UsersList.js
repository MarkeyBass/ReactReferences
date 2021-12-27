import React from "react";
import Card from "../UI/Card";
import styles from "./UsersList.module.css";
import Button from "../UI/Button";

const UsersList = (props) => {
  return (
    <Card className={styles["users-list"]}>
      <ul>
        {props.users.map((user) => (
          <Card key={user.key}>
            <li>
              {user.username} ({user.age} years old)
              <Button
                className={styles["delete-btn"]}
                onClick={() => props.onDeleteUser(user.key)}
              >
                X
              </Button>
            </li>
          </Card>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
