import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class Truncate implements Expression {

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
    if (this.value.getType(controller, ts) == type.INTEGER || this.value.getType(controller, ts) == type.DOUBLE) {
      return type.INTEGER;
    }else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no es número, en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }

  // return the converted to lowercase
  getValue(controller: Controller, ts: TableSymbol) {
    let value = this.value.getValue(controller, ts);
    // evaluate if the value is string
    if (this.value.getType(controller, ts) == type.INTEGER || this.value.getType(controller, ts) == type.DOUBLE) {
      return Math.trunc(value);
    }else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no pudo ser convertido a un entero en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  goOver(): Node {
    let father = new Node("FUNCIÓN NATIVA", "");
    let son = new Node("Truncate", "");
    son.addChild(this.value.goOver());
    father.addChild(son);
    return father;
  }
}
