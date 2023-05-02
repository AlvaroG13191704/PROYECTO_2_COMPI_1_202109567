import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export class ToString implements Expression {
  
    public value: Expression;
    public line: number;
    public column: number;
  
    constructor(value: Expression, line: number, column: number) {
      this.value = value;
      this.line = line;
      this.column = column;
    }
  
    // return the type of the value
    getType(controller: Controller, ts: TableSymbol): type {
      // evaluate if the value is number or boolean
      if (this.value.getType(controller, ts) == type.INTEGER || this.value.getType(controller,ts) == type.DOUBLE || this.value.getType(controller, ts) == type.BOOLEAN) {
        return type.STRING;
      }else {
        // error, the value is not number or boolean
        controller.append(`Error Semantico: El valor no es number o boolean en la linea ${this.line} y columna ${this.column}`);
        return type.ERROR;
      }
    }
  
    // return the converted to string
    getValue(controller: Controller, ts: TableSymbol) {
      // evaluate if the value is number or boolean
      if (this.value.getType(controller, ts) == type.INTEGER || this.value.getType(controller,ts) == type.DOUBLE || this.value.getType(controller, ts) == type.BOOLEAN) {
        return this.value.getValue(controller, ts).toString();
      }else {
        // error, the value is not number or boolean
        controller.append(`Error Semantico: El valor no pudo ser convertido a string en la linea ${this.line} y columna ${this.column}`);
        return null;
      }
    }
  
    goOver(): Node {
      let father = new Node("FUNCIÓN NATIVA", "");
      let son = new Node("ToString", "");
      son.addChild(this.value.goOver());
      father.addChild(son);
      return father;
    }
}