import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//            (lastStateSnapshot, theActionThat Was Dispatched)
// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.value, isValid: action.value.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };

// const passwordReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.value, isValid: action.value.trim().length > 6 };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: "", isValid: false };
// };

const formReducer = (state, action) => {
  const newState = { ...state };
  // Handelind Email State
  if (action.email.type === "USER_INPUT") {
    newState.email = {
      value: action.email.value,
      isValid: action.email.value.includes("@"),
    };
  } else if (action.email.type === "INPUT_BLUR") {
    newState.email = {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  } else {
    newState.email = { value: "", isValid: false };
  }

  // Handeling Password State
  if (action.password.type === "USER_INPUT") {
    newState.password = {
      value: action.password.value,
      isValid: action.password.value.trim().length > 6,
    };
  } else if (action.type === "INPUT_BLUR") {
    newState.password = {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  } else newState.password = { value: "", isValid: false };

  newState.formIsValid = function(){ return (this.email.isValid && this.password.isValid) }

  // newState.formIsValid = (self.email.isValid && self.password.isValid)

  return newState;
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatchForm] = useReducer(formReducer, {
    email: {
      value: " ",
      isValid: null,
    },
    password: {
      value: " ",
      isValid: null,
    },
    // formIsValid: function(){ return (this.email.isValid && this.password.isValid) }
  });

  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });
  // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // const { isValid: emailIsValid } = emailState;
  // const { isValid: passwordIsValid } = passwordState;
  const { formIsValid: myFormIsValid } = formState;

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log("Chacking form validity!");
      // setFormIsValid(emailIsValid && passwordIsValid);
      setFormIsValid(formState.formIsValid);
    }, 2000);

    // Clean UP function - function in use effect that regulates the side effect time execution
    // Runs before the effect function. Doesn't run at the first time
    return () => {
      console.log("Cleanup");
      clearTimeout(timerIdentifier);
    };
  // }, [emailIsValid, passwordIsValid]);
  }, [myFormIsValid, formState.formIsValid]);

  const emailChangeHandler = (event) => {
    // dispatchEmail({ type: "USER_INPUT", value: event.target.value });
    dispatchForm({ email: { type: "USER_INPUT", value: event.target.value } });
  };

  const passwordChangeHandler = (event) => {
    // dispatchPassword({ type: "USER_INPUT", value: event.target.value });
    dispatchForm({
      password: { type: "USER_INPUT", value: event.target.value },
    });
  };

  const validateEmailHandler = () => {
    // dispatchEmail({ type: "INPUT_BLUR" });
    dispatchForm( { email: { type: "INPUT_BLUR" } } );
  };

  const validatePasswordHandler = () => {
    // dispatchPassword({ type: "INPUT_BLUR" });
    dispatchForm({ password: { type: "INPUT_BLUR" } });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    props.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
