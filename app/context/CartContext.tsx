"use client";
import React, { createContext, useContext, useState } from "react";

// Define the cart item type
type CartItem = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, action: "increase" | "decrease") => void;
  getCartTotal: () => number;
}

// Create a context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== id));
  };

  // Update quantity of an item
  const updateQuantity = (id: string, action: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === id
          ? {
              ...cartItem,
              quantity: action === "increase" ? cartItem.quantity + 1 : cartItem.quantity - 1,
            }
          : cartItem
      )
    );
  };

  // Get total price of all items in the cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
