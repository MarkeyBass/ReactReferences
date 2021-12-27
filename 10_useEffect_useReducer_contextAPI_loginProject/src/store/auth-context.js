import React, { useState, useEffect } from "react";

// React.create context will return a (global) component we then use in other componnets.
// In order to use AuthContext we'll need to wrap a component with it then we'll use it in the component and it's children.
const AuthContext = React.createContext({
  isLoggedIn: false, // default value
  onLogout: () => {}, // was inserted for better IDE autocompleton
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsloggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsloggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsloggedIn(true);
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
