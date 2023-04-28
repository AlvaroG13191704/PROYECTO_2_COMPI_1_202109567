import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Break } from "../TransferSentences/Break";
import { Continue } from "../TransferSentences/Continue";
import { Return } from "../TransferSentences/Return";

export class While implements Instruction {
  public condition: Expression;
  public listInstruction: Instruction[];
  public line: number;
  public column: number;

  constructor(condition: Expression, listInstruction: Instruction[], line: number, column: number) {
    this.condition = condition;
    this.listInstruction = listInstruction;
    this.line = line;
    this.column = column;
  }

  // execute the while loop
  execute(controller: Controller, ts: TableSymbol) {
    let temp = controller.sent_loop; // save the current loop
    controller.sent_loop = true; // set the current loop

    // evaluate if the condition is true
    if(this.condition.getType(controller,ts) == type.BOOLEAN){
      next: // label for the loop
      while(this.condition.getValue(controller,ts)){
        // create a new environment
        let localST = new TableSymbol(ts);
        // execute the list of instructions
        for(let inst of this.listInstruction){
          let ret = inst.execute(controller,localST);
          // evlauate break
          if(ret instanceof Break){
            controller.sent_loop = temp; // restore the current loop
            return ret; // break the loop
          }
          if(ret instanceof Continue){
            continue next; // continue the loop
          }
          // return 
          if(ret instanceof Return){
            controller.sent_loop = temp; // restore the current loop
            return ret; // return the value
          }
        }
      }
    }else {
      // error
      controller.append(`Error Semantico: La condicion del while no es booleana, en la linea ${this.line} y columna ${this.column}`);
    }

    controller.sent_loop = temp; // restore the current loop
    return null;
  }

  goOver(): Node {
    let root = new Node("While","");
    root.addChild(this.condition.goOver());
    let inst = new Node("Instructions","");
    for(const ins of this.listInstruction){
      inst.addChild(ins.goOver());
    }
    root.addChild(inst);
    return root;
  }
}