import React from 'react';
import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <div className={classes.Layout}>
      <MainNavigation />
      <main className={classes.main}>
        {props.children}
      </main>
    </div>
  )
}

export default Layout
