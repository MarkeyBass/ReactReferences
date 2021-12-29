// import uiAction to preform side effects (shoing notofocations)
// inside sendCartData() custom action creator
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// CUSTOM FUNCTION CREATORS : using "Thunk" programming pattern (Thunk action creators)
// =========================
// Creating Action Creator in order to dispatch custom actions for side effect (like http requests)
// Those are custom function creators unlike the ones we receive from "@reduxjs/toolkit",
// which we can use out of the box.

// action creator that can preform side effects and then
// can dispatch other actions that reach the reducers as part of flow of side effects.

export const sendCartData = (cartState) => {
  // our function will return a function that receives a dispatch argument.
  // the dispatch argument is preconfigured for us by "@reduxjs/toolkit"
  // so in the inner function we can dispatch again (it is such a common pattern so we have 'dispatch here ready to use).
  // Now we can perform side effects inside the redux-slice. It is a reducer inside a reducer...
  return async (dispatch) => {
    // before calling the dispatch function we can perform any asynchronous code, any side effects.
    // because we have not yet reach our reducer.

    // Dispatchind notifification action:
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data",
      })
    );

    // creating nested function to send http request
    const sendHttpRequest = async () => {
      const response = await fetch(
        "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/ofiiceDepot/cart.json",
        {
          method: "PUT", // With PUT request we'll overide the existing cart with the incomming data
          body: JSON.stringify(cartState),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      // const responseData = await response.json(); // not needed here
    };

    try {
      await sendHttpRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart action successfully",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: err.message + " Sending cart data failed.",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "Getting",
    //     message: "Getting cart data",
    //   })
    // );

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 2000);

    const sendHttpRequest = async () => {
      const response = await fetch(
        "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/ofiiceDepot/cart.json"
      );
      if (!response.ok) {
        throw new Error("Couldn't fetch the cart data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const cartData = await sendHttpRequest();
      if (cartData.cartItems) {
        dispatch(cartActions.replaceCart(cartData));
      }
      // dispatch(
      //   cartActions.replaceCart({
      //     cartItems: cartData.cartItems || [],
      //     totalAmount: cartData.totalAmount,
      //     totalQuantity: cartData.totalQuantity,
      //   })
      // );
    } catch (err) {
      setTimeout(() => {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "New empty cart",
            message: "New empty cart is displayed",
          })
        );
      }, 2000);
      dispatch(uiActions.hideNotification());
    }
  };
};
