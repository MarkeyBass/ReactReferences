import { useReducer } from "react";

import MEALS_LIST from "../components/Meals/meals-list";
// import CART_ITEMS_LIST from "../components/Cart/cart-items-list";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  // items: CART_ITEMS_LIST,
  totalAmount: 0,
};

// Our reducer function is outside of the component function.
//             state = last snapshot,  action = some data {} I send here
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    let updatedItems;
    if (state.items.find(item => item.id === action.item.id)) {
      const itemsIndex = state.items.findIndex(item => item.id === action.item.id);
      updatedItems =  [ ...state.items ];
      updatedItems[itemsIndex].amount += action.item.amount; 
    } else {
      //                    concate is like push but will return a new array (instead editing old one)
      updatedItems =  state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  } else if (action.type === 'REMOVE_ITEM' ) {
    const updatedItems = [...state.items]
    
    const existingItemIndex = updatedItems.findIndex(item => item.id === action.id);
    const existingItem = updatedItems[existingItemIndex];
    
    // Updating total payment 
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    // Reducing one items amount at a time
    existingItem.amount-- ;

    // Clearing Item from cart in case amont < 0    
    if(existingItem.amount < 1) {
      updatedItems.splice(existingItemIndex, 1);
    }

    // Teachers solution - I liked mine better
    //===========================================
    // let updatedItems;
    // if (existingItem.amount === 1) {
    //   updatedItems = state.items.filter(item => item.id != action.id)
    // } else {
    //   const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
    //   updatedItems = [ ...state.items ];
    //   updatedItems[existingItemIndex] = updatedItem;
    // }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
};

// In this component we manage the logic of the cart data
const CartProvider = (props) => {
  //                like setCartState with more possibillities
  //     state       function for dispatching the state
  const [cartState, dispatchCartAction] = useReducer(
    // pointind to the reducer function
    cartReducer,
    // initial state
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item: item});
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    // const indexToRemove = cartContext.items.findIndex((item) => item.id === id);
    // cartContext.items.splice(indexToRemove, 1);
  };

  const totalAmount = MEALS_LIST.length;

  const cartContext = {
    // items: CART_ITEMS_LIST,
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
