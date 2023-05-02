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
  getTableSymbol(controller: Controller, ts: TableSymbol) {
    let graphviz: string = "digraph SymbolTable {\n";
    // add the header of the table: Identificador, Tipo, Primitivo,Linea, Columna
    graphviz += "n[shape=none label = <\n" +
      " <TABLE border=\"0\" cellspacing=\"0\" cellpadding=\"10\" style=\"collapse\">\n" +
      "  <TR >\n" +
      "  <TD colspan=\"6\" border=\"1\">No.</TD>\n" +
      "  <TD rowspan=\"2\" colspan=\"1\" border=\"1\">Identificador</TD>\n" +
      "  <TD colspan=\"6\" border=\"1\">Tipo</TD>\n" +
      "  <TD colspan=\"6\" border=\"1\">Primitivo</TD>\n" +
      "  <TD colspan=\"6\" border=\"1\">Linea</TD>\n" +
      "  <TD colspan=\"6\" border=\"1\">Columna</TD>\n" +
      "  </TR>\n";
    // add the body of the table
    while (ts != null) {
      ts.table.forEach((sim: Symbol, key: string) => {
        console.log(sim);
      })
      ts = ts.previous;
    }
    // end
    graphviz += " </TABLE>\n" +
      ">];\n" +
      "}";

    console.log(graphviz);
  }


  // get the value of the table
  getValue(symbol: Symbol): string {
    if (symbol.value !== null) {
      return symbol.value.toString();
    } else {
      return "null";
    }
  }

  // get type of the symbol
  getType(symbol: Symbol): string {
    return symbol.type.nameType.toLowerCase();
  }

  // get the role of the symbol
  getRole(symbol: Symbol): string {
    let role: string = "";
    switch (symbol.symbol) {
      case 1:
        role = "variable";
        break;
      case 2:
        role = "function";
        break;
      case 3:
        role = "method";
        break;
      case 4:
        role = "vector";
        break;
      case 5:
        role = "list";
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