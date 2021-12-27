// In big applications it is good to use the Redux DevTools for debugging
// With redux toolkit redux devtools will work out of the box.
// With regular redux we need to set up some code in order for it to work.

// https://github.com/reduxjs/redux-devtools

import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
// import { uiActions } from "./store/ui-slice";  // The uiActions were mooved to the cart-slice store
import { sendCartData, fetchCartData } from "./store/cart-custom-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartDisplayed = useSelector((state) => state.ui.isCartVisible);

  const notificationState = useSelector((state) => state.ui.notification);

  // when the state changes we'll get the latest cart
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // when cartState changes use effect will change the backend database
  useEffect(() => {
    // This if check prevents the progran to execute at the first time and sending http PUT request with no data.
    if (isInitial) {
      isInitial = false;
      return;
    }

    // Unlike before where we dispatched an action creator that dispach an action object with type... here we
    // using useDispatch hook to dispatch a custom action creator function(that returns another function) from cart-slice.js
    
    
    // isTouched=false will prevent notification beindg displayed on first render.
    if (cartState.isTouched) {
      dispatch(
        sendCartData({
          cartItems: cartState.cartItems,
          totalAmount: cartState.totalAmount,
          totalQuantity: cartState.totalQuantity
        })
      );
    }
  }, [cartState, dispatch]);

  return (
    <Fragment>
      {notificationState && (
        <Notification
          title={notificationState.title}
          message={notificationState.message}
          status={notificationState.status}
        />
      )}
      <Layout>
        {isCartDisplayed && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
