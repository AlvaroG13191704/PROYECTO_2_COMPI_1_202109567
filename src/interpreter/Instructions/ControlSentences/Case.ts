import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { Break } from "../TransferSentences/Break";

export class Case implements Instruction{
  // manage the cases of a switch
  public value: Expression; // value to compare
  public instructions: Instruction[]; // instructions to execute
  public line: number;
  public column: number;

  constructor(value: Expression, instructions: Instruction[], line: number, column: number) {
    this.value = value;
    this.instructions = instructions;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    let localST = new TableSymbol(ts);
    for(const inst of this.instructions){
      let res:any = inst.execute(controller, localST);
      if(res instanceof Break){
        return res;
      }
    }
  }

  goOver(): Node {
    let root = new Node("Case","");
    root.addChild(this.value.goOver());
    let instructions = new Node("INSTRUCCIÓN","");
    for(const inst of this.instructions){
      instructions.addChild(inst.goOver());
    }
    root.addChild(instructions);
    return root;
  }

}