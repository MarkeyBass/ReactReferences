import React from "react";

const CartContext = React.createContext({
  // We initiate the context object for better outo completion.
  // The propreties and methods of the context will be configured at ArtProvider.js
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

export default CartContext;

