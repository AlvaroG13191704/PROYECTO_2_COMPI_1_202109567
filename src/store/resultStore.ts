import { create } from "zustand";

interface ResultStore {
  result: string;
  grammar:string;
  error: string;
  updateCurrentCode: (code: string) => void;
}

export const analyzeStore = create<ResultStore>((set) => ({
  result: "",
  grammar:"",
  error: "",
  updateCurrentCode: (code) => set({ grammar: code }),
}))   