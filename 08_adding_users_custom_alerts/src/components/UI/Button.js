import styles from './Button.module.css';

const Button = props => {
  const classes = styles.button + (props.className ? props.className : "")

  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={styles.button}
    >
      {props.children}
    </button>
  )
}

export default Button;