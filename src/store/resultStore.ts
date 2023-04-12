import { create } from "zustand";

interface ResultStore {
  result: string;
}

export const useResultStore = create<ResultStore>(() => ({
  result: "desde el store",
})) 