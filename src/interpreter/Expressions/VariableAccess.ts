import { Expression } from "../Abstract/Expression";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";


export class VariableAccess extends Expression {
  nameVariable : string;

  constructor(nameVariable : string, line : number, column : number) {
    super(line, column);
    this.nameVariable = nameVariable;
  }

  public getValue(current: Enviroment, global: Enviroment, ast: AST) {
    let variable = current.getVariable(this.nameVariable);
    
    if(variable === undefined){
      throw new Error("La variable " + this.nameVariable + " no existe fue declarada " + this.line + " , " + this.column );
    }

    let value = variable.getValue();

    this.type = variable.getType();
    return value;
  }
}