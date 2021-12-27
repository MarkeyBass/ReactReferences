import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
// import CART_ITEMS_LIST from "./cart-items-list";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  // isCheckout is a bulean that tells the dom weather we go to order mode
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Will open the mailing form to the browser and hide the items.
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const reservationData = {
      user: userData,
      orderedItems: cartCtx.items,
      payment: totalAmount,
    };
    console.log(reservationData);

    await fetch(
      "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/food_order/reservations.json",
      {
        method: "POST",
        body: JSON.stringify(reservationData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //                              the bind function insures that the arguments will be passed to the next function
          //                               bind preconfigures function for futur execution
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // buttons that will be shown when we are not in the order mode.
  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {!isCheckout && cartItems}
      {/* {cartItems} */}
      <div className={styles.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={() => setIsCheckout(false)}
          // onCancel={props.onCloseCart} 
          onSubmitOrder={submitOrderHandler}
        />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <p>Sending order data...</p>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p>Thank you! Delicious food is on the way...</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseCart}>Close</button>
      </div>
    </Fragment>
  );

  return <Modal onCloseModal={props.onCloseCart}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {didSubmit &&!isSubmitting && didSubmitModalContent}
  </Modal>;
};

export default Cart;
