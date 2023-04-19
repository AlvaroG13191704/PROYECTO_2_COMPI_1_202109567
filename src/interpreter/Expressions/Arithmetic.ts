import { Expression } from "../Abstract/Expression";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Type } from "../Symbol/Type";
import { TypePrimitive } from "../Symbol/TypePrimitive";

export class Arithmetic extends Expression {
  expLeft : Expression;
  expRight : Expression;
  operator : string;

  constructor(expLeft : Expression, expRight : Expression, operator : string, line : number, column : number) {
    super(line, column);
    this.expLeft = expLeft;
    this.expRight = expRight;
    this.operator = operator;
  }

  public getValue(current: Enviroment, global: Enviroment, ast: AST) {
    let valueLeft = this.expLeft.getValue(current, global, ast);
    let leftType = this.expLeft.type;
    let valueRight = this.expRight.getValue(current, global, ast);
    let rightType = this.expRight.type;

    switch (this.operator) {
      case '+':
        {
          return this.Sum(valueLeft, leftType, valueRight, rightType, current, global, ast);
        }    
    }
  }

  // add
  public Sum(val1: any, typ1: Type, val2:any, typ2: Type, current: Enviroment, global: Enviroment, ast: AST ):any{
    let prim1: TypePrimitive = typ1.getType();
    let prim2: TypePrimitive = typ2.getType();

    // INTEGER
    if(prim1 === TypePrimitive.INTEGER && prim2 === TypePrimitive.INTEGER){
      this.type = new Type(TypePrimitive.INTEGER);
      return val1 + val2;
    }
  }
}