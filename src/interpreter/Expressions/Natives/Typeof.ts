import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class Typeof implements Expression {

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
    //evaluate wkat type of value is
    if (this.value.getType(controller, ts) == type.INTEGER || this.value.getType(controller, ts) == type.DOUBLE || this.value.getType(controller, ts) == type.CHAR || this.value.getType(controller, ts) == type.BOOLEAN || this.value.getType(controller, ts) == type.UNARY) { 
      return type.STRING;
    // TODO: add vector and list 
    } else {
      // error, the value is not string
      controller.append(`Error Semantico: No existe un tipo para este valor, en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }

  // return the converted to lowercase
  getValue(controller: Controller, ts: TableSymbol) {
    let value = this.value.getValue(controller, ts);
    // evaluate if the value is string
    if (this.value.getType(controller, ts) == type.INTEGER) {
      return "int";
      
    } else if (this.value.getType(controller, ts) == type.DOUBLE) {
      return "double";
      
    } else if (this.value.getType(controller, ts) == type.STRING) {
      return "string";
    } else if (this.value.getType(controller, ts) == type.BOOLEAN) {
      return "boolean";
    } else if (this.value.getType(controller, ts) == type.CHAR) {
      return "char";
    } else if (this.value.getType(controller, ts) == type.UNARY) {
      return "unary";
    }
    // TODO: add vector and list 
    else {
      // error, the value is not string
      controller.append(`Error Semantico: El valor no pudo ser redondeado a un entero en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  goOver(): Node {
    let father = new Node("typeof", "");
    father.addChild(this.value.goOver());
    return father;
  }
}
