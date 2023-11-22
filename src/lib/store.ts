import { create } from "zustand";

export const useStore = create<{
  mode: string;
}>((set) => ({
  mode: "light",
}));
