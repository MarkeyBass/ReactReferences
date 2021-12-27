import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";



// Inorder to conect our app to the store we wrap it with the provider and then
// addin 'store' value to the 'store' prop of the provider.
// Then it provides redux store to the react app.
import store from "./store/index-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
