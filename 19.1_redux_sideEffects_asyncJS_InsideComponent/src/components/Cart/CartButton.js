import { uiActions } from '../../store/ui-slice'; 
import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const itemsQuantity = useSelector(state => state.cart.totalQuantity)

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
