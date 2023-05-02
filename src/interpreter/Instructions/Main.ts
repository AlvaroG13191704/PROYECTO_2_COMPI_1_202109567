import { Node } from "../AST/Node";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Callback } from "./Callback";

export class Main implements Instruction {
  public call: Callback;
  public line : number;
  public column : number;

  constructor(call: Callback, line: number, column: number) {
    this.call = call;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    this.call.execute(controller, ts);
  }

  goOver(): Node {
    let father = new Node("MAIN", "");
    father.addChild(this.call.goOver());
    return father;
  }
}