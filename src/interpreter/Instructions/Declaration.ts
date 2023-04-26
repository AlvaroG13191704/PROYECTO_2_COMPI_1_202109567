import { Errors } from "../AST/Errors";
import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type, type } from "../TableSymbols/Type";

export class VariableDeclaration implements Instruction {

  public type: Type; // type of the variable
  public id: string; // name of the variable
  public expression: Expression; // value of the variable

  public line: number;
  public column: number;

  constructor(type: Type, id: string, expression: any, line: number, column: number) {
    this.type = type;
    this.id = id;
    this.expression = expression;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    // example int x = 5;
    // boolean y;
    // verify if the variable already exists
    if(ts.existCurrent(this.id)){
      // if the variable exists, then return an error
      let error = new Errors("Semantico", `La variable ${this.id} ya existe`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: La variable ${this.id} ya existe en la linea ${this.line} y columna ${this.column}`);
    }

    // verify if the expression is not null
    if(this.expression !== null ){
      let valueType = this.expression.getType(controller, ts);
      let value = this.expression.getValue(controller, ts);

      // verify if the type of the variable is the same of the expression
      if(this.type.enumType === valueType){
        let newSymbol = new Symbol(1, this.type, this.id, value, undefined, undefined, this.line, this.column);
        ts.add(this.id, newSymbol);
      }else {
        // cast values if is possible
        if(this.type.enumType === type.DOUBLE && valueType === type.INTEGER){
          let newSymbol = new Symbol(1, this.type, this.id, value, undefined, undefined, this.line, this.column);
          ts.add(this.id, newSymbol);
        }else if (this.type.enumType === type.INTEGER && valueType === type.DOUBLE){
          let newSymbol = new Symbol(1, this.type, this.id, Math.trunc(value), undefined, undefined, this.line, this.column);
          ts.add(this.id, newSymbol);
        }else {
          // if the types are different, then return an error
          let error = new Errors("Semantico", `El tipo de la variable ${this.id} no coincide con el valor asignado`, this.line, this.column);
          controller.errors.push(error);
          // send to the console
          controller.append(`Error Semantico: El tipo de la variable ${this.id} no coincide con el valor asignado en la linea ${this.line} y columna ${this.column}`);
        }
      }
    }else{
      // if the expresssion is null, append with the default value
      let newSymbol = new Symbol(1, this.type, this.id, null, undefined, undefined, this.line, this.column);
      ts.add(this.id, newSymbol);

      // set default value
      if(this.type.enumType === type.INTEGER){
        newSymbol.setValue(0);
      }else if(this.type.enumType === type.DOUBLE){
        newSymbol.setValue(0.0);
      }else if(this.type.enumType === type.STRING){
        newSymbol.setValue("");
      }else if(this.type.enumType === type.BOOLEAN){
        newSymbol.setValue(true);
      }else if(this.type.enumType === type.CHAR){
        newSymbol.setValue('\u0000');
      }

    }
    return null;
  }

  goOver(): Node {
    let father = new Node("DECLARACION","");
    father.addChild(new Node(this.type.nameType, ""));

    father.addChild(new Node(this.id, ""));

    if(this.expression !== null){
      father.addChild(this.expression.goOver());
    }
    
    return father;
  }
}