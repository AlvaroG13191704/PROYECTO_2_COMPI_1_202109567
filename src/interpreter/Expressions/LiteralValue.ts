import { Expression } from "../Abstract/Expression";
import { AST } from "../Symbol/AST";
import { Enviroment } from "../Symbol/Enviroment";
import { Type } from "../Symbol/Type";
import { TypePrimitive } from "../Symbol/TypePrimitive";

export class LiteralValue extends Expression{
  value: string;
  typeValue: string;

  constructor(value: string, typeValue: string, line: number, column: number) {
    super(line, column);
    this.value = value;
    this.typeValue = typeValue;
  }

  public getValue(current: Enviroment, global: Enviroment, ast: AST) {
    switch (this.typeValue) {
      case "integer":
        {
          this.type = new Type(TypePrimitive.INTEGER);
          return parseInt(this.value);
        }
      case "double":
        {
          this.type = new Type(TypePrimitive.DOUBLE);
          return parseFloat(this.value);
        }
      case "string":
        {
          this.type = new Type(TypePrimitive.STRING);
          return this.value;
        }
      case "true":
        {
          this.type = new Type(TypePrimitive.BOOLEAN);
          return "true";
        }
      case "false":
        {
          this.type = new Type(TypePrimitive.BOOLEAN);
          return "false";
        }
      case "char":
        {
          this.type = new Type(TypePrimitive.CHAR);
          return this.value;
        }
    }
  }
}