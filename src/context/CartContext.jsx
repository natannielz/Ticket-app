import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addToCart = (event) => {
    setCart((prevCart) => [...prevCart, event]);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1s
  };

  const removeFromCart = (eventId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== eventId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isAnimating }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};
