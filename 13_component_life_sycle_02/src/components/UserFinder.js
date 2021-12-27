import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";

import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class UserFinder extends Component {
  constructor() {
    super();

    this.state = {
      // filteredUsers: DUMMY_USERS,
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // can be used to fetch DUMMY_USERS from server
  // This function will run only once, when the component run for the first time.
  // It is equivalent to using useEffect(..., []) with an empty array or useEffect(, [someDep]).
  componentDidMount() {
    // Send Http request here...

    this.setState({ filteredUsers: DUMMY_USERS })
  }


  // will execute the function on every state change hence will chang the filteredUsers value.
  // The function expect to receive two important arguments:
  componentDidUpdate(prevProps, prevState) {
  //   // in order to prevent infinit loop:
  //   // This is equivalent to the array of dependencies in useEffect
    if(prevState.searchTerm !== this.state.searchTerm) {

      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.toUpperCase().includes(this.state.searchTerm.toUpperCase())
        ),
      });
    }
  };

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });

    // It is possible (in this case) to change both state value in this function without using componentDidChanged.
    // const filtered = DUMMY_USERS.filter((user) => user.name.toUpperCase().includes(event.target.value.toUpperCase()))
    // this.setState( { filteredUsers: filtered , searchTerm: event.target.value} );
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment >
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
