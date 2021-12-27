import React from "react";

const CartContext = React.createContext({
  // Here we initiate the context object for better outo completion.
  // The propreties and methods of the context will be configured at CartProvider.js
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;

