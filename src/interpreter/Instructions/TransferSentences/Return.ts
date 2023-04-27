import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";

export class Return implements Instruction {
  public valueReturn: Expression;

  constructor(valueReturn: Expression) {
    this.valueReturn = valueReturn;
  }

  execute(controller: Controller, ts: TableSymbol) {
    // verify if the value return is null
    if(this.valueReturn === null) {
      this;
    }else {
      return this.valueReturn.getValue(controller, ts);
    }
  }


  goOver(): Node {
    let father = new Node("Return","");
    if(this.valueReturn != null) {
      father.addChild(this.valueReturn.goOver());
    }
    return father;
  }
}