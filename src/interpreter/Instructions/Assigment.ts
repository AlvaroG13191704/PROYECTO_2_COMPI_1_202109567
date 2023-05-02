import { Errors } from "../AST/Errors";
import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";

export class Assigment implements Instruction {

  public id: string; // name of the variable
  public value: Expression; // value of the variable
  public line: number;
  public column: number;

  constructor(id: string, value: Expression, line: number, column: number) {
    this.id = id;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    // verifiy if the id exist in the table of symbols
    if (ts.exist(this.id)) {
      // if exists, verify if the value is the same type of the variable
      let value = this.value.getValue(controller, ts);
      let variable = ts.getSymbol(this.id);
      if (variable?.type.enumType == this.value.getType(controller, ts)) {
        // if is the same type, assign the value to the variable
        ts.getSymbol(this.id)?.setValue(value);
      } else {
        // cast
        if (variable?.type.enumType == type.DOUBLE && this.value.getType(controller, ts) == type.INTEGER) {
          ts.getSymbol(this.id)?.setValue(value);
        } else if (variable?.type.enumType == type.INTEGER && this.value.getType(controller, ts) == type.DOUBLE) {
          ts.getSymbol(this.id)?.setValue(Math.trunc(value));
        }else {
          // error
          let error = new Errors("Semantico", `El tipo de la variable ${this.id} no coincide con el valor asignado`, this.line, this.column);
          controller.errors.push(error);
          // send to the console
          controller.append(`Error Semantico: El tipo de la variable ${this.id} no coincide con el valor asignado en la linea ${this.line} y columna ${this.column}`);
          return null;
        }
      }
    } else {
      // if the variable doesn't exist, then return an error
      let error = new Errors("Semantico", `La variable ${this.id} no existe`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: La variable ${this.id} no existe en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  // example: x = 5;
  // create node
  goOver(): Node {
    let father = new Node("ASIGNACIÓN", "");
    father.addChild(new Node(`Identificador: ${this.id}`, ""));

    if(this.value != null) {
      father.addChild(this.value.goOver());
    }

    return father;
  }
}