

// this class is used to store the symbols like variables, functions, methods...

import { Symbol } from "./Symbol";

export class TableSymbol {

  public previous: TableSymbol;
  public table: Map<string, Symbol>;
  public static table_to_graph: Symbol[];

  constructor(previous: TableSymbol | any) {
    this.previous = previous; // indicates the previous table to manage the scope
    this.table = new Map<string, Symbol>();
  }
  // add a new symbol to the static table
  static add_to_graph(id: string, symbol: Symbol): void {
    if (TableSymbol.table_to_graph === undefined) {
      TableSymbol.table_to_graph = [];
    }
    TableSymbol.table_to_graph.push(symbol);
  }
  // get the map of the static table
  static getTable(): Symbol[] {
    return TableSymbol.table_to_graph;
  }
  // clean the static table
  static cleanTable(): void {
    TableSymbol.table_to_graph = [];
  }

  // add a new symbol to the table
  add(id: string, symbol: Symbol): void {
    this.table.set(id.toLowerCase(), symbol);
  }

  // exist a symbol in the table
  exist(id: string): boolean {
    let ts: TableSymbol = this;
    while(ts != null) {
      let exist = ts.table.get(id.toLowerCase());

      if(exist != null) {
        return true;
      }
      ts = ts.previous;
    }
    return false;
  }

  // get a symbol from the table
  getSymbol(id: string): Symbol | null {
    let ts: TableSymbol = this;
    while(ts != null) {
      let exist = ts.table.get(id.toLowerCase());

      if(exist != null) {
        return exist;
      }
      ts = ts.previous;
    }
    return null;
  }

  // verify if the symbol exist in the current table
  existCurrent(id: string): boolean {
    let ts: TableSymbol = this;
    let exist = ts.table.get(id.toLowerCase());

    if(exist != null) {
      return true;
    }
    return false;
  }
}