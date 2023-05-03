import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class ModifyList implements Instruction {
  public id: string;
  public index: Expression;
  public value: Expression;
  public line: number;
  public column: number;


  constructor(id: string, index: Expression, value: Expression, line: number, column: number) {
    this.id = id;
    this.index = index;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  // return the type of the expression
  execute(controller: Controller, ts: TableSymbol) {
    // get the list from the table of symbols
    const variable = ts.getSymbol(this.id);

    if (variable === null) {
      controller.append(`Error semantico, no se encontro la lista ${this.id}, liena ${this.line}, columna ${this.column}`);
      return;
    }else {
      let indexValue = this.index.getValue(controller, ts);
      let indexType = this.index.getType(controller, ts);
      let value = this.value.getValue(controller, ts);
      let valueType = this.value.getType(controller, ts);

      // verify if the index is a number
      if( indexType !== type.INTEGER){
        controller.append(`Error semantico, el indice debe ser un numero, liena ${this.line}, columna ${this.column}`);
        return;
      }else if (indexValue < 0 || indexValue >= variable.value.length){
        controller.append(`Error semantico, el indice esta fuera del rango, liena ${this.line}, columna ${this.column}`);
        return;
      } else if( valueType !== variable.type.getType()){
        controller.append(`Error semantico, el tipo de dato no coincide, liena ${this.line}, columna ${this.column}`);
        return;
      }

      // modify the value
      variable.value[indexValue] = value;

    }
  }
  // TODO: fix here
  goOver(): Node {
    let father = new Node("MODIFICAR LISTA","");
    father.addChild(new Node(`Identificador: ${this.id}`,""));
    father.addChild(new Node(`Indice: ${this.index}`,""));
    father.addChild(new Node(`Valor: ${this.value}`,""));

    return father;
  }
}