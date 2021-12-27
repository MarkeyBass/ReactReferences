import React from 'react';

import styles from "./Header.module.css"

import mealsImage from "../../assets/meals.jpg"
import HeaderCartButton from './HeaderCartButton';


const Header = props => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Elegant Food</h1>
        <HeaderCartButton onClick={props.onOpenCart}/>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="Yammy Food Pic" />
      </div>
    </React.Fragment>

  )
};

export default Header;