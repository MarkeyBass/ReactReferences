import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {

  // this life sycle function will run only when a component is removed from the DOM.
  componentWillUnmount() {
    console.log('user was unmount!')
  }
  
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
