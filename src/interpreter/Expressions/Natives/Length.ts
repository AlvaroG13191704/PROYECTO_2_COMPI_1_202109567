import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class Length implements Expression {
  public value: Expression;
  public line: number;
  public column: number;

  constructor(value: Expression, line: number, column: number) {
    this.value = value;
    this.line = line;
    this.column = column;
  }

  // return what type of value is
  getType(controller: Controller, ts: TableSymbol): type {
    // evaluate if the value is string
    console.log(this.value.getType(controller, ts));
    if (this.value.getType(controller, ts) == type.STRING || this.value.getType(controller, ts) == type.VECTOR || this.value.getType(controller, ts) == type.LIST) {
      return type.INTEGER;
    }
    else {
      // error, the value is not string
      controller.append(`Error Semantico: No existe un tipo para este valor, en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }
  // return the length of the string, vector or list
  getValue(controller: Controller, ts: TableSymbol) {
    // evaluate if the value is string
    // console.log(this.value.getValue(controller, ts));
    if (this.value.getType(controller, ts) == type.STRING || this.value.getType(controller, ts) == type.VECTOR || this.value.getType(controller, ts) == type.LIST) {
      return this.value.getValue(controller, ts).length;
    }
    else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no es una cadena de texto, vector o lista, en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  goOver(): Node {
    let father = new Node("length", "");
    father.addChild(this.value.goOver());
    return father;
  }
}