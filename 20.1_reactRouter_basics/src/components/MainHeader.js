import React from "react";
import { Link } from "react-router-dom";
// in order to show the current link we can replace Link with NavLink
import { NavLink } from "react-router-dom";

import classes from './MainHeader.module.css'

function MainHeader() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* <Link to="/welcome">welcome</Link> */}
            {/* inside the activeClassName prop we can define the className beeng added on active state */}
            <NavLink activeClassName={classes.active} to="/welcome">welcome</NavLink>
          </li>
          <li>
            {/* <Link to="/products">products</Link> */}
            <NavLink activeClassName={classes.active} to="/products">products</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
