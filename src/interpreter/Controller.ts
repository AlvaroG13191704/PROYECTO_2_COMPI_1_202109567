// this class is the controller of the interpreter

import { Errors } from "./AST/Errors";
import { Symbol } from "./TableSymbols/Symbol";
import { TableSymbol } from "./TableSymbols/TableSymbol";

interface SymbolTable {
  identifier: string;
  role: string;
  type: string;
  line: number | undefined;
  column: number | undefined;
}

// control errors, prints of the interpreter
export class Controller {

  public errors: Errors[];
  public console: string;
  public sent_loop: boolean;

  constructor() {
    this.errors = new Array<Errors>();
    this.console = "";
    this.sent_loop = false;
  }

  // append result to the console
  append(result: string): void {
    this.console = this.console + result + "\n";
  }

  // retrun a list of the symbol table
  getTableSymbol(controller: Controller, ts: TableSymbol): string {
    let graphviz: string = "digraph SymbolTable {\n";
    // add the header of the table: Identificador, Tipo, Primitivo,Linea, Columna
    graphviz += "node [shape=plaintext];\n" +
      " table [label=<\n" +
      "<table border=\"0\" cellborder=\"1\" cellspacing=\"0\">\n" +
      "<tr><td>Identificador</td><td>Tipo</td><td>Rol</td><td>Valor</td><td>Linea</td><td>Columna</td></tr>\n";
    // end
    // access to the static list of the table symbol
    if (TableSymbol.getTable() !== undefined) {
      TableSymbol.getTable().forEach((symbol: Symbol, key: number) => {
        // add the row of the table
        graphviz += "<tr><td>" + symbol.id + "</td><td>" + ((this.getType(symbol) == undefined) ? "void" : this.getType(symbol)) + "</td><td>" + this.getRole(symbol) + "</td>" + "<td>" + ((this.getValue(symbol) === null) ? "- -" : this.getValue(symbol)) + "</td><td>" + symbol.line + "</td><td>" + symbol.column + "</td></tr>\n";
        // end
      })
    }
    // end
    graphviz += " </table>\n" +
      ">];\n" +
      "}";

    return graphviz;
  }


  // get the value of the table
  getValue(symbol: Symbol): string {
    if (symbol.value !== null) {
      if(symbol.value instanceof Array){
        return symbol.value.toString();
      }else {
        return symbol.value;
      }
    } else {
      return "null";
    }
  }

  // get type of the symbol
  getType(symbol: Symbol): string {
    return symbol.type.nameType;
  }

  // get the role of the symbol
  getRole(symbol: Symbol): string {
    let role: string = "";
    switch (symbol.symbol) {
      case 1:
        role = "Variable";
        break;
      case 2:
        role = "Función";
        break;
      case 3:
        role = "Método";
        break;
      case 4:
        role = "Vector";
        break;
      case 5:
        role = "Lista";
        break;
      case 6:
        role = "param";
        break;
    }
    return role;
  }

  // get the mount of params
  getParams(symbol: Symbol): string {
    if (symbol.paramLit !== undefined) {
      return symbol.paramLit.length.toString();
    } else {
      return "0";
    }
  }

}