import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";

export class Print extends Instruction {

  list_exp : Expression[];

  constructor(list_exp : Expression[], line : number, column : number) {
    super(line, column);
    this.list_exp = list_exp;
  }

  public execute(current: Enviroment, global: Enviroment, ast: AST) {

    if(this.list_exp.length === 1){
      let exp: Expression = this.list_exp[0];
      let value = exp.getValue(current, global, ast);
      // verify the type of the value
      if(exp.type?.getType() === 0 || exp.type?.getType() === 1 || exp.type?.getType() === 2 || exp.type?.getType() === 3 || exp.type?.getType() === 4 ){
        ast.writeConsole(value.toString());
      }else {
        // throw error
        throw new Error("La variable que se desea imprimir debe de ser de tipo enteros, dobles, booleanos o caracteres " + this.line + " , " + this.column );
      }
    }else {
      // error
      throw new Error("La funcion print solo recibe un parametro " + this.line + " , " + this.column );
    }

  }
}