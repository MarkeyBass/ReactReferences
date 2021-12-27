import { Component } from "react";
import UsersContext from "../store/users-context";

class ErrorBoundary extends Component {
  // class based component can use unly one context (per component), Example:
  static contextType = UsersContext;

  constructor() {
    super();

    this.state = {
       hasError: false,

      // This didn't work for me.. waiting for an answear
      //  users: this.props.users
      };
  }

  // adding this function (lifecycle method) will make a component an Error Boundery
  // It will be triggered whenever a child component throws an error.
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
    console.log("An error occured!");
  }

  // This didn't work foe me.. waiting for an answear
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchTerm !== this.state.searchTerm && prevState.users.length > 0) {
  //     this.setState({ hasError: false });
  //   }
  // }

  render() {
    if (this.state.hasError === true) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
