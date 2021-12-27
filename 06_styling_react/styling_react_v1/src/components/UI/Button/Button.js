import React from "react";

// USING CSS MODULES TO SCOPE CSS STYLES TO ONE SPECIFIC COMPONENT

import styles from "./Button.module.css";
// import classes from "./Button.css";

// import styled from "styled-components";

// const Button = styled.button`
//   /* Default width for smaller screens */
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   /* Case of big screen */
//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={styles.button}
      /* className="button" */ onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
