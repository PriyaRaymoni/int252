import { create } from "zustand";
import { getAllItems } from "@/services/firebaseConfig";

const useItems = create((set) => ({
  items: JSON.parse(localStorage.getItem("items")) || [],
  fetchItems: async () => {
    const items = await getAllItems();
    localStorage.setItem("items", JSON.stringify(items));
    set({ items });
  },
  getItems: async () => {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    if (items.length === 0) {
      items = await getAllItems();
      localStorage.setItem("items", JSON.stringify(items));
      set({ items });
    }
    return items;
  },
}));

export default useItems;