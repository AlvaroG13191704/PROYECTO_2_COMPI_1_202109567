import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class ToLower implements Expression {

  public value: Expression;
  public line: number;
  public column: number;

  constructor(value: Expression, line: number, column: number) {
    this.value = value;
    this.line = line;
    this.column = column;
  }

  // return the type of the value
  getType(controller: Controller, ts: TableSymbol): type {
    // evaluate if the value is string
    if (this.value.getType(controller, ts) == type.STRING) {
      return type.STRING;
    }else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no es string en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }

  // return the converted to lowercase
  getValue(controller: Controller, ts: TableSymbol) {
    let value = this.value.getValue(controller, ts);
    // evaluate if the value is string
    if (this.value.getType(controller, ts) == type.STRING) {
      return value.toLowerCase();
    }else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no pudo ser convertido a minusculas en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  goOver(): Node {
    let father = new Node("ToLower", "");
    father.addChild(this.value.goOver());
    return father;
  }
}
