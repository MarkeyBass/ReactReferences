import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [ btnIsHighlited, setBtnIsHighlited ] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  
  const numberOfCartItems = cartCtx.items.reduce(
    // curNumber   , item
    (accumulator, currentValue) => {
      return accumulator + currentValue.amount;
      // starting value for the accumulator = 0
    },
    0
  );

  const btnClasses = `${styles.button} ${btnIsHighlited ? styles.bump : ''}`;

  // The app uses useEffect to triger the bump animation on the header cart btn.
  // This animation is a side effect hence the app use's the useEffect hook
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlited(true);

    const timer = setTimeout(() => setBtnIsHighlited(false), 300);

    // adding a cleaner in case this btn will be removed
    // also when the effect reruns (before expiring) the timer is cleared.
    // returning a function in useEffect will be called automatically a cleanup function.
    return () => {
      clearTimeout(timer);
    };

    // each time cartCtx.items will change the use effect will be triggered.
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles}>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
