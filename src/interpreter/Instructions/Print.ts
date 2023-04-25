import { Errors } from "../AST/Errors";
import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";

export class Print implements Instruction {

  public expression: Expression;
  public line: number;
  public column: number;

  constructor(expression: Expression, line: number, column: number) {
    this.expression = expression;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    
    let typeValue = this.expression.getType(controller, ts);

    if(typeValue === type.INTEGER || typeValue === type.DOUBLE || typeValue === type.STRING || typeValue === type.BOOLEAN || typeValue === type.CHAR){
      let value = this.expression.getValue(controller, ts);
      controller.append(value);
    }else {
      let error = new Errors("Semantico", `No se puede imprimir una expresion de tipo ${typeValue}`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: No se puede imprimir una expresion de tipo ${typeValue} en la linea ${this.line} y columna ${this.column}`);
    }
  }

  // example: print(x);
  // create node
  goOver(): Node {
    let father = new Node("Print", "");
    let expression = new Node("Expression", "");
    expression.addChild(this.expression.goOver());
    father.addChild(expression);
    return father;
  }
}