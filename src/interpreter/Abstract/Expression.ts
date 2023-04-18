import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Node } from "../Symbol/Node";
import { Type } from "../Symbol/Type";

export abstract class Expression extends Node {
  public type: Type | undefined;

  constructor(line: number, column: number) {
    super(line, column);
    this.type = undefined ;
  }

  // any Expression return a value
  public abstract getValue(current: Enviroment, global: Enviroment, ast: AST): any;
}