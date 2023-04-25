import { Node } from "../AST/Node";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";

export interface Instruction {

  // this method execute the instruction
  // controller -> control errors, prints of the interpreter
  // ts -> table of symbols
  execute(controller: Controller, ts: TableSymbol): any;

  // this methos go over the the sub tree of the instruction
  goOver(): Node;
}