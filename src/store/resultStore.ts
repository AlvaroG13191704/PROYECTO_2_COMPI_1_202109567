import { create } from "zustand";

interface ResultStore {
  result: string;
  grammar:string;
  reports: {
    table_errors: string;
    ast_graph: string;
    symbol_table: string;
  }
  updateCurrentCode: (code: string) => void;
  updateResult: (code: string) => void;
  updateReport: (report: any) => void;
}

export const analyzeStore = create<ResultStore>((set) => ({
  result: "",
  grammar:"",
  reports: {
    table_errors: "",
    ast_graph: "",
    symbol_table: "",
  },
  updateCurrentCode: (code) => set({ grammar: code }),
  updateResult: (code:string) => set({ result: code }),
  updateReport: (report) => set({ reports: report }),
}))   