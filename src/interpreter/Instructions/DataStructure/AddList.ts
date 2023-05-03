import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";

export class AddList implements Instruction {
  public id: string;
  public value: Expression;
  public line: number;
  public column: number;

  constructor(id: string, value: Expression, line: number, column: number) {
    this.id = id;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  // return the a value added to the list
  execute(controller: Controller, ts: TableSymbol) {
    // get the list from the table of symbols
    const variable = ts.getSymbol(this.id);

    if (variable === null) {
      controller.append(`Error semantico, no se encontro la lista ${this.id}, liena ${this.line}, columna ${this.column}`);
      return;
    }else {
      let value = this.value.getValue(controller, ts);
      let valueType = this.value.getType(controller, ts);
      // verify if the value is the same type of the list
      if( valueType !== variable.type.getType()){
        controller.append(`Error semantico, el tipo de dato no coincide con el tipo de la lista, linea ${this.line}, columna ${this.column}`);
        return;
      }
      // add the value to the list
      variable.value.push(value);
    }
  }

  goOver(): Node {
    let father = new Node("AGREGAR LISTA","");
    father.addChild(new Node(`Identificador: ${this.id}`,""));
    father.addChild(new Node(`add`,""));
    father.addChild(new Node(`Valor: ${this.value}`,""));
    return father;
  }
}