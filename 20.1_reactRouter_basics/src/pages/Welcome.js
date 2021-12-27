import { Fragment } from "react";
import { Route } from "react-router";
// Nested Routes
const Welcome = () => {
  return (
    <Fragment>
      <h1>The wellcome Page</h1>
      {/* This roout will be evaluated if the welcome page is evaluated */}
      <Route path='/welcome/new-user'>
        <p>Welcome, new user!</p>
      </Route>
    </Fragment>
  );
};

export default Welcome;
