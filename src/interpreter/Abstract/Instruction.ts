import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Node } from "../Symbol/Node";

export abstract class Instruction extends Node {

  constructor(line: number, column: number) {
    super(line, column);
  }

  // any Instruction make a action
  public abstract execute(curent:Enviroment, global: Enviroment, ast: AST): any;

}