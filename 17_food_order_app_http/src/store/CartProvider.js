import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};


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

  else if (action.type === 'CLEAR_ALL' ){
    return defaultCartState;
  }

  return defaultCartState;
};

// In this component we manage the logic of the cart data
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item: item});
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', id: id})
  };

  const clearCartHandler = (id) => {
    dispatchCartAction({type: 'CLEAR_ALL'})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
