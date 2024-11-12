import { create } from "zustand";

const useCart = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
  addToCart: (item) => {
    set((state) => {
      const newCart = [...state.cart, item];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
  removeFromCart: (item) => {
    set((state) => {
      const newCart = state.cart.filter((i) => i.id !== item.id);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
  increaseItem: (item) => {
    set((state) => {
      const newCart = state.cart.map((i) => {
        if (i.id === item.id) {
          i.quantity += 1;
        }
        return i;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
  decreaseItem: (item) => {
    set((state) => {
      const newCart = state.cart.map((i) => {
        if (i.id === item.id) {
          i.quantity -= 1;
        }
        return i;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
  clearCart: () => {
    set((state) => {
      localStorage.removeItem("cartItems");
      return { cart: [] };
    });
  },
  totalAmount: (cart) => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  isEmpty: (cart) => {
    return cart.length === 0;
  },
}));

export default useCart;
