import { create } from "zustand";

const useUser = create((set) => ({
  user: localStorage.getItem("user") || null,
  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    set({ user: null });
  },
  signup: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    set({ user });
  },
}));

export default useUser;
