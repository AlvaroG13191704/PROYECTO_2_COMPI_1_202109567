import { Node } from "../../../AST/Node";
import { Expression } from "../../../Abstract/Expression";
import { Controller } from "../../../Controller";
import { TableSymbol } from "../../../TableSymbols/TableSymbol";
import { type } from "../../../TableSymbols/Type";

export class AccessList implements Expression {
  public id: string;
  public index: Expression;
  public line: number;
  public column: number;

  constructor(id: string, index: Expression, line: number, column: number) {
    this.id = id;
    this.index = index;
    this.line = line;
    this.column = column;
  }

  getType(controller: Controller, ts: TableSymbol): type {
    // verifiy if the variable exist in the table of symbols
    let exist_id = ts.getSymbol(this.id);
    if (exist_id != null) {
      // verify if the type of the vector 
      return exist_id.type.enumType;
    } else {
      controller.append(`La lista ${this.id} no fue declarado, linea ${this.line} y columna ${this.column}`,);
      return type.ERROR;
    }
  }

  // return the value of the variable
  getValue(controller: Controller, ts: TableSymbol) {
    const variable = ts.getSymbol(this.id);
    if (variable === null) {
      controller.append(`La lista "${this.id}" no fue declarado, linea ${this.line} y columna ${this.column}`,);
      return null;
    }

    let valuesArray: [] = variable?.value;
    let indexType = this.index.getType(controller, ts);
    let indexValue = this.index.getValue(controller, ts);

    // verify if the index is a number
    if (indexType != type.INTEGER) {
      controller.append(`El indice de la lista ${this.id} no es un numero, linea ${this.line} y columna ${this.column}`,);
      return null;
    }
    // verify if the index is in the range of the vector
    if (indexValue < 0 || indexValue >= valuesArray.length) {
      controller.append(`El indice de la lsita ${this.id} no esta en el rango, linea ${this.line} y columna ${this.column}`,);
      return null;
    }

    // return the value of the vector
    return valuesArray[indexValue];
  }

  goOver(): Node {
    let father = new Node("ACCESO VECTOR", "");
    father.addChild(new Node(this.id, ""));
    father.addChild(this.index.goOver());
    return father;
  }
}