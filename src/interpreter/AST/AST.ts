import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { VariableDeclaration } from "../Instructions/Declaration";
import { Function } from "../Instructions/Function";
import { Main } from "../Instructions/Main";
import { Vector } from "../Instructions/Vector";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Node } from "./Node";

export class AST implements Instruction {

  public list_instructions: Instruction[];

  constructor(list_instructions: Instruction[]) {
    this.list_instructions = list_instructions;
  }

  execute(controller: Controller, ts: TableSymbol) {
    let main_flag = false;
    // first pass to declare functions and methods
    for(let inst of this.list_instructions){
      if(inst instanceof Function){
        const func = inst as Function;
        func.appendFunctionST(ts);
      }
    }
    // second pass to declare variables and some callabcks
    // print(x) | int c = 0;
    for(let instruction of this.list_instructions){
      if(instruction instanceof VariableDeclaration || instruction instanceof Vector){
        instruction.execute(controller, ts);
      }
    }

    // third pass to execute the rest of the instructions
    for(let instruction of this.list_instructions){
      if(instruction instanceof Main && !main_flag){
        main_flag = true;
        instruction.execute(controller, ts);
      } else if(main_flag){
        // error
        controller.append(`Error Semantico: Ya existe un metodo main en el archivo`);
        return null;
      }


      // if(!(instruction instanceof VariableDeclaration) && !(instruction instanceof Function)){
      //   instruction.execute(controller, ts);
      // }
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