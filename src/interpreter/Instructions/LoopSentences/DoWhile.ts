import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Break } from "../TransferSentences/Break";
import { Continue } from "../TransferSentences/Continue";
import { Return } from "../TransferSentences/Return";

export class DoWhile implements Instruction {
  // variables
  public listInstruction: Instruction[];
  public condition: Expression;
  public line: number;
  public column: number;

  constructor(listInstruction: Instruction[], condition: Expression, line: number, column: number) {
    this.listInstruction = listInstruction;
    this.condition = condition;
    this.line = line;
    this.column = column;
  }

  // execute the while loop
  execute(controller: Controller, ts: TableSymbol) {
    let temp = controller.sent_loop; // save the current loop
    controller.sent_loop = true; // set the current loop

    // evaluate if the condition is bool
    if(this.condition.getType(controller,ts) != type.BOOLEAN){
      // error
      controller.append(`Error Semantico: La condicion del while no es booleana, en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
    // executes once the list of instructions
    do {
      // create a new environment
      let localST = new TableSymbol(ts);
      // execute the list of instructions
      for (let inst of this.listInstruction) {
        let ret = inst.execute(controller, localST);
        // evlauate break
        if (ret instanceof Break) {
          controller.sent_loop = temp; // restore the current loop
          return ret; // break the loop
        }
        if (ret instanceof Continue) {
          continue; // continue the loop
        }
        //eturn
        if (ret instanceof Return){
          controller.sent_loop = temp; // restore the current loop
          return ret; // return the value
        }
      }
    } while (this.condition.getValue(controller, ts));

    controller.sent_loop = temp; // restore the current loop
    return null;
  }

  goOver(): Node {
    let root = new Node("SENTENCIA DO WHILE","");
    root.addChild(new Node("do",""));
    let inst = new Node("Instructions","");
    for(let i of this.listInstruction){
      inst.addChild(i.goOver());
    }
    root.addChild(inst);
    root.addChild(new Node("while",""));
    root.addChild(this.condition.goOver());
    return root;
  }
}