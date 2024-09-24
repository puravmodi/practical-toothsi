"use client";
import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  subTotal: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// Create the context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create the provider component
export const CartProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // State to hold cart items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);

  // Function to add an item to the cart
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update the quantity if the product already exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { id: item.id, quantity: item.quantity }
            : item
        );
      }
      // Add the product to the cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of an item
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    }
    setCart((prevCart) =>
      prevCart?.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const memoisedValue = useMemo(() => {
    return {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setCart,
      subTotal,
      setSubTotal,
    };
  }, [cart, subTotal, updateQuantity]);

  return (
    <CartContext.Provider value={memoisedValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart should be wrapped within CartProvider.");
  }
  return ctx;
};
