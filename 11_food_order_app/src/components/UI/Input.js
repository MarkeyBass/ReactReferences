import React from "react";

import styles from "./Input.module.css";

// The 'Input' component (custum component) is wreped with React.forwardRef() in order to use refs inside it.
// Now this component function is an argument to forwardRef.
//                                     2nd parameter is ref in order to used it and pass it.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* Adding all properties from outside the component without knowin which prop to expect*/}
      <input ref={ref}/*id={props.input.id} */ {...props.input} />
    </div>
  );
});

export default Input;
