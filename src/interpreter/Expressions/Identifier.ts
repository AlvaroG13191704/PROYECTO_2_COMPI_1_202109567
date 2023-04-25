import { Errors } from "../AST/Errors";
import { Node } from "../AST/Node";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";
import { Expression } from "../Abstract/Expression";

export class Identifier implements Expression {

  public identifier: string;
  public line: number;
  public column: number;

  constructor(identifier: string, line: number, column: number) {
    this.identifier = identifier;
    this.line = line;
    this.column = column;
  }

  // print(x);

  getType(controller: Controller, ts: TableSymbol): type {
    let exist_id = ts.getSymbol(this.identifier);
    if(exist_id != null){
      return exist_id.type.enumType;
    }else {
      let error = new Errors("Semantico", `No existe la variable ${this.identifier}`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: No existe la variable ${this.identifier} en la linea ${this.line} y columna ${this.column}`);
      return type.ERROR;
    }
  }

  getValue(controller: Controller, ts: TableSymbol) {
    let exist_id = ts.getSymbol(this.identifier);
    if(exist_id != null){
      return exist_id.value;
    }else {
      let error = new Errors("Semantico", `No existe la variable ${this.identifier}`, this.line, this.column);
      controller.errors.push(error);
      // send to the console
      controller.append(`Error Semantico: No existe la variable ${this.identifier} en la linea ${this.line} y columna ${this.column}`);
      return null;
    }
  }

  goOver(): Node {
    let father = new Node("Indetificador", "");
    father.addChild(new Node(this.identifier, ""));
    return father;
  }

}