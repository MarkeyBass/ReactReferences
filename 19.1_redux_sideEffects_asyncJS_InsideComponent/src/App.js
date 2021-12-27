import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartDisplayed = useSelector((state) => state.ui.isCartVisible);

  const notificationState = useSelector((state) => state.ui.notification);

  // when the state changes we'll get the latest cart
  const cartState = useSelector((state) => state.cart);
  // when cartState changes use effect will change the backend database
  useEffect(() => {

    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data",
        })
      );
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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart action successfully",
        })
      );
    };

    // This if check prevents the progran to execute at the first time and sending http PUT request with no data.
    if(isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: err.message,
        })
      );
    });
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
