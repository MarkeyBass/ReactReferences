import { Component, useState } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component{

  constructor () {
    super();

    // In class components state is always an object.
    // It's state manipulated in the "toggleUsersHandler()" function
    this.state = {
      showUsers: true,
      otherState: 'Test'
    }
  }

  toggleUsersHandler() {
    // Unlike useEffect hooke where setState replaces the whole state 
    // here setState will only change the keys in the returned object. 
    this.setState(oldState => {
      return { showUsers: !oldState.showUsers }
    });
  }

  render() {

    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
  
    return (
      <div className={classes.users}>
        {/* ."bind(this)" is used to bind object instance to the 'this' keyword and not to the button as expected in javascript. */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }

}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
