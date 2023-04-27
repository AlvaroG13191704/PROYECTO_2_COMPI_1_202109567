import { Node } from "../../AST/Node";
import { Instruction } from "../../Abstract/Instruction";

export class Continue implements Instruction {
  constructor() {}

  execute() {
    return this
  }

  goOver():Node {
    return new Node("Continue","");
  }
}