import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./CustomAlert.module.css";

const CustomAlert = (props) => {
  return (
    <Card>
    <div className={styles.alert}>
      <div className={styles.msg_1}>
        <h3>{props.msg_1}</h3>
      </div>
      <div className={styles.msg_2}>
        <p>{props.msg_2}</p>
        <Button className={styles.btnAlert} onClick={() => props.onRemoveAlert()}>Okay</Button>
      </div>
    </div>
    </Card>
  );
};

export default CustomAlert;