import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type, type } from "../TableSymbols/Type";

export class Vector implements Instruction {
  public typeDeclaration: number; // 1 -> number, 2 -> expression
  public type: Type;
  public id: string;
  public size: Expression;
  public list_values: Expression[];
  public line: number;
  public column: number;

  constructor(typeDeclaration: number, type: Type, id: string, size: Expression, list_values: Expression[], line: number, column: number) {
    this.typeDeclaration = typeDeclaration;
    this.type = type;
    this.id = id;
    this.size = size;
    this.list_values = list_values;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    // int[ ] vector1 = new int[4]; -> first case
    // int[ ] vector2 = {1,2,3,4}; -> second case

    // verify if the variable already exists
    if (ts.existCurrent(this.id)) {
      // send to the console
      controller.append(`Error Semantico: El vector "${this.id}" ya existe en la linea ${this.line} y columna ${this.column}`);
      return null;
    }

    // verify the type of the vector
    if (this.typeDeclaration == 1) { // int[ ] vector1 = new int[4]; -> first case -> assing default values
      // get the size
      let size = this.size.getValue(controller, ts);
      let values = [];
      // set default values
      if (this.type.getType() === type.INTEGER) {
        values = this.generateDefatulVector(0, size);
      } else if (this.type.getType() === type.DOUBLE) {
        values = this.generateDefatulVector(0.0, size);
      } else if (this.type.getType() === type.STRING) {
        values = this.generateDefatulVector("", size);
      } else if (this.type.getType() === type.BOOLEAN) {
        values = this.generateDefatulVector(true, size);
      } else if (this.type.getType() === type.CHAR) {
        values = this.generateDefatulVector('0', size);
      } else {
        controller.append(`Error Semantico: El tipo de dato ${this.type.nameType} no es valido para un vector en la linea ${this.line} y columna ${this.column}`);
        return null;
      }
      // add the vector to the table of symbols
      let newSymbol = new Symbol(4, this.type, this.id, values, undefined, undefined, this.line, this.column);
      ts.add(this.id, newSymbol);
      TableSymbol.add_to_graph(this.id, newSymbol);
      
    } else if (this.typeDeclaration == 2) { // int[ ] vector2 = {1,2,3,4}; -> second case -> assing values
      // get the size
      let value = this.generateVectorValues(this.list_values, controller, ts);
      let size = value.length;
      // add the vector to the table of symbols
      let newSymbol = new Symbol(4, this.type, this.id, value, undefined, undefined, this.line, this.column);
      ts.add(this.id, newSymbol);
      TableSymbol.add_to_graph(this.id, newSymbol);
    } else {
      controller.append(`Error Semantico: El tipo de declaracion ${this.typeDeclaration} no es valido para un vector en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }
  // fill the vector with default values
  generateDefatulVector(defaultValue: any, size: number): any[] {
    let values = [];
    for (let i = 0; i < size; i++) {
      values.push(defaultValue);
    }
    return values;
  }

  // fill the vector with values
  generateVectorValues(values: Expression[], controller: Controller, ts: TableSymbol): any[] {
    let newValues = [];
    for (let i = 0; i < values.length; i++) {
      let value = values[i].getValue(controller, ts);
      newValues.push(value);
    }
    return newValues;
  }

  // generate ast
  goOver(): Node {
    let father = new Node("VECTOR", "");
    let type = new Node(this.type.nameType, "");
    let id = new Node(this.id, "");
    let list_values = new Node("LISTA DE VALORES", "");
    // iterate the list of values
    if (this.list_values != null) {
      for (let i = 0; i < this.list_values.length; i++) {
        list_values.addChild(this.list_values[i].goOver());
      }
    }
    // add the nodes to the father
    father.addChild(type);
    father.addChild(id);
    father.addChild(list_values);
    return father;
  }

}