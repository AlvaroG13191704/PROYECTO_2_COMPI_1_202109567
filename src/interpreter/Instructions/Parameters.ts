import { Instruction } from "../Abstract/Instruction";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";

export class Parameters extends Instruction{
  constructor(line: number, column: number) {
    super(line, column);
  }

  public execute(curent: Enviroment, global: Enviroment, ast: AST) {
    
  }

}