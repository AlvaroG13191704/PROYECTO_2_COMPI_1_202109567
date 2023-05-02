import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type, type } from "../TableSymbols/Type";


// Save the value of the primitive 
/*
Example
1 -> primitive -> type = INTEGER -> value = 1
1.0 -> primitive -> type = DOUBLE -> value = 1.0
"Hello" -> primitive -> type = STRING -> value = "Hello"
true -> primitive -> type = BOOLEAN -> value = true
'c' -> primitive -> type = CHAR -> value = 'c'
*/
export class Primitive implements Expression {

  public primitiveValue: any; // refers to the value of the primitive
  public type: Type; // refers to the type of the primitive
  public line: number;
  public column: number;

  constructor(primitiveValue: any, type: string, line: number, column: number) {
    this.primitiveValue = primitiveValue;
    this.type = new Type(type);
    this.line = line;
    this.column = column;
  }

  getType(controller: Controller, ts: TableSymbol): type {
    return this.type.enumType;
  }

  getValue(controlador: Controller, ts: TableSymbol) {
    // evluate if the primitive is a string
    if (this.type.enumType == type.STRING) {
      return this.primitiveValue;
    }
    // evaluate if the primitive is a char
    else if (this.type.enumType == type.CHAR) {
      return this.primitiveValue;
    }
    // evaluate if the primitive is a boolean
    else if (this.type.enumType == type.BOOLEAN) {
      return this.primitiveValue;
    }
    // evaluate if the primitive is a integer
    else if (this.type.enumType == type.INTEGER) {
      return parseInt(this.primitiveValue);
    }
    // evaluate if the primitive is a double
    else if (this.type.enumType == type.DOUBLE) {
      return parseFloat(this.primitiveValue);
    }
  }

  goOver(): Node {
    let father = new Node("PRIMITIVO", "");
    father.addChild(new Node(this.primitiveValue.toString(), ""));
    return father;
  }

}