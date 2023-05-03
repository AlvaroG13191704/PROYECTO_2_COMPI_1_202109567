import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type } from "../TableSymbols/Type";

export class List implements Instruction {
  public typeDeclaration: number; // 1 -> normal, 2 -> tocharArray
  public type: Type;
  public id: string;
  public values: Expression;
  public line: number;
  public column: number;

  constructor(typeDeclaration: number, type: Type, id: string, values: Expression, line: number, column: number) {
    this.typeDeclaration = typeDeclaration;
    this.type = type;
    this.id = id;
    this.values = values;
    this.line = line;
    this.column = column;
  }

  execute(controller: Controller, ts: TableSymbol) {
    // verify if the variable already exists
    if (ts.existCurrent(this.id)) {
      // send to the console
      controller.append(`Error Semantico: El vector "${this.id}" ya existe en la linea ${this.line} y columna ${this.column}`);
      return null;
    }

    // determine the type of list
    if(this.typeDeclaration == 1) { // list<int> lista1 = new list<int> -> type 1
      let values: any[] = [];
      let newSymbol = new Symbol(5, this.type, this.id, values, undefined, undefined, this.line, this.column);
      ts.add(this.id, newSymbol);
      TableSymbol.add_to_graph(this.id, newSymbol);
    }
    // second type to declare with ToCharArray
    else if(this.typeDeclaration == 2) { // list<char> caracteres = toCharArray(“Hola”);
      let values = this.values.getValue(controller, ts);
      // convert to char array
      let array = values.split("");
      let newSymbol = new Symbol(5, this.type, this.id, array, undefined, undefined, this.line, this.column);
      console.log(newSymbol);
      ts.add(this.id, newSymbol);
      TableSymbol.add_to_graph(this.id, newSymbol);
    }
  }

  goOver(): Node {
    let father = new Node("LISTA","");
    father.addChild(new Node(`Tipo: ${this.type.nameType}`, ""));
    father.addChild(new Node(`Identificador: ${this.id}`, ""));

    return father;
  }

}