import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

import AuthContext from "./store/auth-context";

// import AuthContextProvider from "./store/auth-context"
// import AuthContext from "./store/auth-context";

function App() {
  // All Auth logic (inctuding states) was moved to auth-context.js file
  

  const ctx = useContext(AuthContext);

  return (
    
    // App is the provider of the context "state" to its children
    // that will be consumers
    <React.Fragment>
      {/* <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}> */}
      <MainHeader /*isAuthenticated={isLoggedIn}*/ /*onLogout={logoutHandler}*/
      />
      <main>
        {!ctx.isLoggedIn && <Login /*onLogin={loginHandler}*/ />}
        {ctx.isLoggedIn && <Home /*onLogout={logoutHandler}*/ />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
