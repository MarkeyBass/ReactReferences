import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const openCartHandler = () => setCartIsOpen(true);
  const closeCartHandler = () => setCartIsOpen(false);

  return (
    <CartProvider>
      <Header onOpenCart={openCartHandler} />
      <main>
        {cartIsOpen && (
          <Cart onCloseCart={closeCartHandler} />
        )}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
