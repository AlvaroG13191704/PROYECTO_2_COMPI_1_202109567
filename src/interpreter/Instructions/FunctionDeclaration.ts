import { Instruction } from "../Abstract/Instruction";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Node } from "../Symbol/Node";
import { Type } from "../Symbol/Type";
import { VariableDeclaration } from "./VariableDeclaration";

export class FunctionDeclaration extends Instruction{
  type: Type;
  id: string;
  parameters: VariableDeclaration[];
  sentences: Node[];

  constructor(type: Type, id: string, parameters: VariableDeclaration[], sentences: Node[], line: number, column: number) {
    super(line, column);
    this.type = type;
    this.id = id;
    this.parameters = parameters;
    this.sentences = sentences;
  }

  public execute(curent: Enviroment, global: Enviroment, ast: AST) {
    console.log("Method not implemented.");
  }
}