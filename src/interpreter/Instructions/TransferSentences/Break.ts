import { Node } from "../../AST/Node";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";

export class Break implements Instruction {
  constructor() {}

  execute(controller: Controller, ts: TableSymbol) {
    return this
  }

  goOver(): Node {
    return new Node("Break","");
  }
}