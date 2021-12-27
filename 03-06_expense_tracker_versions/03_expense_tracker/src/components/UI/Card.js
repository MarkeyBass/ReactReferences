import "./Card.css";

function Card(props) {
  const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>; 
  // props.children is builtin prop allows creating container type components
}

export default Card;
