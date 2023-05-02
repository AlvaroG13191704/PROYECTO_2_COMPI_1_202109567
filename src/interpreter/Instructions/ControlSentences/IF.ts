import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Break } from "../TransferSentences/Break";
import { Continue } from "../TransferSentences/Continue";
import { Return } from "../TransferSentences/Return";

export class IF implements Instruction {

  public condition: Expression; // condition to evaluate
  public ifInstructions: Instruction[]; // instructions to execute if the condition is true
  public elseInstructions: Instruction[]; // instructions to execute if the condition is false
  public line: number;
  public column: number;

  constructor(condition: Expression, ifInstructions: Instruction[], elseInstructions: Instruction[], line: number, column: number) {
    this.condition = condition;
    this.ifInstructions = ifInstructions;
    this.elseInstructions = elseInstructions;
    this.line = line;
    this.column = column;
  }

  // execute if
  execute(controller: Controller, ts: TableSymbol) {
    // create a new table symbol
    let localST = new TableSymbol(ts);
    // get the condition value
    let conditionValue = this.condition.getValue(controller, ts); // True or False
    // verify if the condition value is a boolean
    if (this.condition.getType(controller, ts) == type.BOOLEAN) {
      // if the condition value is true
      if (conditionValue) {
        // iterate through the instructions if
        for (const inst of this.ifInstructions) {
          let ret = inst.execute(controller, localST); // use the local variable 
          if(ret instanceof Break) {
            if(controller.sent_loop) {
              return ret;
            }else {
              // error
              controller.append(`Error Semantico: Un if no puede contener un "Break" a menos que sea una ciclica, en la linea ${this.line} y columna ${this.column}`);
              return null;
            }
          }
          // continue
          if(ret instanceof Continue){
            if(controller.sent_loop) {
              return ret;
            }else {
              // error
              controller.append(`Error Semantico: Un if no puede contener un "Continue" a menos que sea una ciclica, en la linea ${this.line} y columna ${this.column}`);
              return null;
            }
          }
          // return 
          if( ret instanceof Return){
            return ret;
          }
          
          // TODO: check if it is an error
          if (ret != null) {
            return ret;
          }
          
        }
      } else {
        // iterate through the instructions else
        for (let inst of this.elseInstructions) {
          let ret = inst.execute(controller, localST); // use the local variable

          // evaluate if there is a Break
          if (ret instanceof Break) {
            if (controller.sent_loop) {
              return ret;
            } else {
              // error
              controller.append(`Error Semantico: Un else no puede contener un "Break" a menos que sea una ciclica, en la linea ${this.line} y columna ${this.column}`);
              return null;
            }
          }
          // return 
          if( ret instanceof Return){
            return ret;
          }
          if (ret !== null) {
            return ret;
          }
        }
      }
    }else {
      // error
      controller.append(`Error Semantico: La condicion del if debe ser de tipo "Boolean", en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }


  // get the ast of the if
  goOver(): Node {
    let father = new Node("SENTENCIA IF", "");
    father.addChild(new Node("if", ""));
    // add the condition
    father.addChild(this.condition.goOver());
    // add the instructions if
    let ifNode = new Node("INSTRUCCIÓN", "");
    for (let inst of this.ifInstructions) {
      ifNode.addChild(inst.goOver());
    }
    father.addChild(ifNode);
    // add the instructions else
    let elseNode = new Node("else", "");
    elseNode.addChild(new Node("INSTRUCCIÓN", ""));
    for (let inst of this.elseInstructions) {
      elseNode.addChild(inst.goOver());
    }
    father.addChild(elseNode);
    return father;

  }
}