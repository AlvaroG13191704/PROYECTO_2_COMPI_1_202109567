import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type, type } from "../TableSymbols/Type";

export class Cast implements Instruction{

  public type: Type; // type of the variable
  public id: string; // name of the variable
  public expression: Expression; // value of the variable
  public castType: Type;
  public line: number;
  public column: number;

  constructor(type: Type, id: string, expression: Expression, castType: Type, line: number, column: number) {
    this.type = type;
    this.id = id;
    this.expression = expression;
    this.castType = castType;
    this.line = line;
    this.column = column;
  }

  // cast a value to another type
  execute(controller: Controller, ts: TableSymbol) {
    
    // verify if the variable already exists
    if(ts.exist(this.id)){
      // send to the console
      controller.append(`Error Semantico: La variable ${this.id} ya existe en la linea ${this.line} y columna ${this.column}`);
      return null;
    }

    // verify if the id type is the same as the cast type
    let castType = this.castType.getType();
    if(this.type.enumType == castType){
      // verify if the expression is not null
      if(this.expression !== null ){
        let valueType = this.expression.getType(controller, ts);
        let value = this.expression.getValue(controller, ts);
        // verify if the type of the variable is the same of the expression
        if(this.type.enumType == valueType){
          let newSymbol = new Symbol(1, this.type, this.id, value, undefined, undefined, this.line, this.column);
          ts.add(this.id, newSymbol);
        }else {
          // cast values if is possible
          if(this.type.enumType == type.DOUBLE && valueType == type.INTEGER){
            let newSymbol = new Symbol(1, this.type, this.id, Math.round(value), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if (this.type.enumType == type.INTEGER && valueType == type.DOUBLE){
            let newSymbol = new Symbol(1, this.type, this.id, Math.trunc(value), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if(this.type.enumType == type.STRING && valueType == type.INTEGER){
            let newSymbol = new Symbol(1, this.type, this.id, value.toString(), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if(this.type.enumType == type.CHAR && valueType == type.INTEGER){
            let newSymbol = new Symbol(1, this.type, this.id, String.fromCharCode(value), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if(this.type.enumType == type.STRING && valueType == type.DOUBLE){
            let newSymbol = new Symbol(1, this.type, this.id, value.toString(), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if(this.type.enumType == type.INTEGER && valueType == type.CHAR){
            let newSymbol = new Symbol(1, this.type, this.id, value.charCodeAt(0), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else if(this.type.enumType == type.DOUBLE && valueType == type.CHAR){
            let newSymbol = new Symbol(1, this.type, this.id, parseFloat(value.charCodeAt(0)), undefined, undefined, this.line, this.column);
            ts.add(this.id, newSymbol);
          }else {
            // if the types are different, then return an error
            controller.append(`Error Semantico: El tipo de la variable ${this.id} no puede ser casteado,en la linea ${this.line} y columna ${this.column}`);
            return null;
          }
        }
      }else {
        // if the expression is null, then return an error
        controller.append(`Error Semantico: La variable ${this.id} no tiene un valor asignado en la linea ${this.line} y columna ${this.column}`);
        return null;
      }
    }else {
      // if the types are different, then return an error
      controller.append(`Error Semantico: El tipo de la variable ${this.id} no coincide con el tipo de casteo en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }
  // create the node to graph
  // TODO: implement all the nodes
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