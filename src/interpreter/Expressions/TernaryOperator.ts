import { Errors } from "../AST/Errors";
import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";

export class TernaryOperator implements Expression {

  public condition: Expression;
  public ifTrue: Expression;
  public ifFalse: Expression;
  public line: number;
  public column: number;

  constructor(condition: Expression, ifTrue: Expression, ifFalse: Expression, line: number, column: number) {
    this.condition = condition;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    this.line = line;
    this.column = column;
  }
  // return the type of the ternary operator
  getType(controller: Controller, ts: TableSymbol): type {
    // condition ? true : false
    let valueCondition = this.condition.getValue(controller, ts);

    // evaluate if the type of the condition is boolean
    if (this.condition.getType(controller, ts) == type.BOOLEAN) {
      return valueCondition ? this.ifTrue.getType(controller, ts) : this.ifFalse.getType(controller, ts);
    } else {
      // error, the condition is not boolean
      let error = new Errors("Semantico", `La condicion no es booleana`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: La condicion no es booleana en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }

  // return the value of the ternary operator
  getValue(controller: Controller, ts: TableSymbol) {
    let valueCondition = this.condition.getValue(controller, ts);

    // evaluate if the type of the condition is boolean
    if (this.condition.getType(controller, ts) == type.BOOLEAN) {
      return valueCondition ? this.ifTrue.getValue(controller, ts) : this.ifFalse.getValue(controller, ts);
    } else {
      // error, the condition is not boolean
      let error = new Errors("Semantico", `La condicion no es booleana`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: La condicion no es booleana en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  // go over the sub tree of the ternary operator
  goOver(): Node {
    let father = new Node("Operador ternario", "");

    let condition = new Node("Condicion", "");
    condition.addChild(this.condition.goOver());
    father.addChild(condition);

    // add symbol
    father.addChild(new Node("?", ""));

    let ifTrue = new Node("Es verdadero", "");
    ifTrue.addChild(this.ifTrue.goOver());
    father.addChild(ifTrue);

    // add symbol
    father.addChild(new Node(":", ""));

    let ifFalse = new Node("Es falso", "");
    ifFalse.addChild(this.ifFalse.goOver());
    father.addChild(ifFalse);

    return father;

  }

}