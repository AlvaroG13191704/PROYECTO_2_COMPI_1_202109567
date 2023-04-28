import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Break } from "../TransferSentences/Break";
import { Continue } from "../TransferSentences/Continue";
import { Return } from "../TransferSentences/Return";

export class For implements Instruction{
  
  // variables
  public dec_assing: Instruction;
  public condition: Expression;
  public update: Instruction;
  public listInstructions: Instruction[];
  public line: number;
  public column: number;

  constructor(dec_assing: Instruction, condition: Expression, update: Instruction, listInstructions: Instruction[], line: number, column: number) {
    this.dec_assing = dec_assing;
    this.condition = condition;
    this.update = update;
    this.listInstructions = listInstructions;
    this.line = line;
    this.column = column;
  }

  // execute the instruction
  execute(controller: Controller, ts: TableSymbol) {
    // create local environment
    let localTS = new TableSymbol(ts);
    // temporal variable
    let temp = controller.sent_loop;
    controller.sent_loop = true; // set true for the break and continue
    // execute the declaration or assignment
    this.dec_assing.execute(controller, localTS);

    // execute the condition
    // for(int i = 0; i < 10; i++){//int k; }
    // evaluate the condition is boolean
    if(this.condition.getType(controller,localTS) == type.BOOLEAN){
      // while the condition is true
      while(this.condition.getValue(controller, localTS)){
        // create local environment
        let localTSFor = new TableSymbol(localTS);
        // execute the list of instructions
        for(const inst of this.listInstructions){
          let ret = inst.execute(controller, localTSFor);
          if( ret instanceof Break){
            controller.sent_loop = temp;
            return ret;
          }
          // continue
          if(ret instanceof Continue){
            continue;
          }
          // Return
          if(ret instanceof Return) {
            controller.sent_loop = temp;
            return ret;
          }
        }
        // execute the update
        this.update.execute(controller, localTS);
      }
    }else {
      // error
      controller.append(`Error Semantico: La condicion del for no es booleana, en la linea ${this.line} y columna ${this.column}`);
    }

    // restore the value of the sent_loop
    controller.sent_loop = temp;
    return null;
  }

  // get the ast of the instruction
  goOver(): Node {
    let father = new Node("SENTENCIA FOR","")
    father.addChild(new Node("for",""))
    father.addChild(new Node("(",""))
    father.addChild(this.dec_assing.goOver())
    father.addChild(new Node(";",""))
    father.addChild(this.condition.goOver())
    father.addChild(new Node(";",""))
    father.addChild(this.update.goOver())
    father.addChild(new Node(")",""))
    let child = new Node("INSTRUCCIONES","")
    for(const inst of this.listInstructions){
      child.addChild(inst.goOver())
    }
    father.addChild(child)
    return father
  }
}