import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0, // Total price to pay
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
      state.totalQuantity++;
      state.totalAmount = state.totalAmount + newItem.price;
    },
    removeItemFromCart(state, action) {

      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if(existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;

    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
