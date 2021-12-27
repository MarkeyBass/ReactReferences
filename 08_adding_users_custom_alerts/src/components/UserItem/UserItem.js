import styles from "./UserItem.module.css";

const UserItem = (props) => {
  return(
  <li className={styles['user-item']} >
    {props.children}
  </li>
  )
};

export default UserItem;
