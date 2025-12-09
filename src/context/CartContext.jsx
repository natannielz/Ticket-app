import { useState, useEffect } from 'react';
import { CartContext } from './CartContextDefinition';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('canvas_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('canvas_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (event, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === event.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === event.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...event, quantity }];
    });
  };

  const removeFromCart = (eventId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== eventId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
