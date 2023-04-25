import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { VariableDeclaration } from "../Instructions/Declaration";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Node } from "./Node";

export class AST implements Instruction {

  public list_instructions: Instruction[];

  constructor(list_instructions: Instruction[]) {
    this.list_instructions = list_instructions;
  }

  execute(controller: Controller, ts: TableSymbol) {
    
    // first pass to declare functions and methods

    // second pass to declare variables and some callabcks
    // print(x) | int c = 0;
    for(let instruction of this.list_instructions){
      if(instruction instanceof VariableDeclaration){
        instruction.execute(controller, ts);
      }
    }

    // third pass to execute the rest of the instructions
    for(let instruction of this.list_instructions){
      if(!(instruction instanceof VariableDeclaration)){
        instruction.execute(controller, ts);
      }
    }
  }

  goOver(): Node {
    let root = new Node("AST","");
    for(let instruction of this.list_instructions){
      root.addChild(instruction.goOver());
    }
    return root;
  }
}