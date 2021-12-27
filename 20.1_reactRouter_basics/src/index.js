import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// To implemet react router we must wrap the root component with BrowserRouter component

import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
