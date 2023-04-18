import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";

export class VariableAssigment extends Instruction {
  id: string;
  exp: Expression;

  constructor(id: string, exp: Expression, line: number, column: number) {
    super(line, column);
    this.id = id;
    this.exp = exp;
  }

  // execute() to assign an existing variable
  public execute(curent: Enviroment, global: Enviroment, ast: AST) {
    let variable = curent.getVariable(this.id); // get variable from enviroment

    if(variable === undefined) {
      // ERROR
      throw new Error("Variable no definida: " + this.id + this.line + " , " + this.column);
    }

    // value to assign
    let value = this.exp.getValue(curent, global, ast);
    if(variable.type.getType() !== this.exp.type?.getType()){
      // ERROR
      throw new Error("Tipo de variable no es igual al tipo de la expresion: " + this.line + " , " + this.column);
    }

    // assign value if the type is the same
    variable.setValue(value);
  }
}