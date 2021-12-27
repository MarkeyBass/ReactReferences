import { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
// import CART_ITEMS_LIST from "./cart-items-list";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // const cartItems = (
  //   <ul className={styles["cart-items"]}>
  //     {cartCtx.items.map((item) => (
  //       <li className={styles["flex-row"]}>
  //         {item.name}{" "}
  //         <span className={styles["text-right"]}>(pieces: {item.amount})</span>
  //       </li>
  //     ))}
  //   </ul>
  // );

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
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
          //                               bind preconfigures function for future execution
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // let totalAmount = 0;
  // cartCtx.items.forEach((item) => {
  //   totalAmount += item.price;
  //   totalAmount = +totalAmount.toFixed(2);
  // });

  return (
    <Modal onCloseModal={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount </span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
