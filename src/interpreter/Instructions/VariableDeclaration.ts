import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Type } from "../Symbol/Type";
import { TypePrimitive } from "../Symbol/TypePrimitive";
import { Variable } from "../Symbol/Variable";

export class VariableDeclaration extends Instruction {
  
  type: Type;
  id: string;
  exp: Expression | undefined;

  constructor(type: Type, id: string, exp: Expression |undefined, line: number, column: number) {
    super(line, column);
    this.type = type;
    this.id = id;
    this.exp = exp;
  }

  // execute() to declare a variable 
  public execute(current: Enviroment, global: Enviroment, ast: AST) {
    // verify if the variable is already declared
    console.log(current.existsVariable(this.id));

    if(current.existsVariable(this.id)) {
      throw new Error("Variable ya se encuentra definida en el entorno actual: " + this.line + " , " + this.column);
    }

    let res
    // verify is the type is the same
    if(this.exp != undefined){

      res = this.exp.getValue(current, global, ast);
      

      if(this.type.type != this.exp.type?.getType()){
        throw new Error("Tipo de variable declarada no es igual al tipo de la expresion: " + this.line + " , " + this.column);
      } 
    }else {
      if(this.type.getType() === TypePrimitive.INTEGER){
        res = 0;
      }else if(this.type.getType() === TypePrimitive.DOUBLE){
        res = 0.0;
      }else if(this.type.getType() === TypePrimitive.CHAR){
        res ='\u0000'
      }else if(this.type.getType() === TypePrimitive.BOOLEAN){
        res = true;
      }else if(this.type.getType() === TypePrimitive.STRING){
        res = "";
      }
    }
    // insert variable
    let newVar = new Variable(this.type, this.id, res);
    current.insertVariable(this.id, newVar);
  }
}