import { Node } from "../AST/Node";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";
import { Function } from "./Function";

export class Callback implements Instruction, Expression {
  // variables
  public id: string;
  public params: Expression[];
  public line: number;
  public column: number;

  constructor(id: string, params: Expression[], line: number, column: number) {
    this.id = id;
    this.params = params;
    this.line = line;
    this.column = column;
  }

  // get type
  getType(controller: Controller, ts: TableSymbol): type {
    let symbolFunction = ts.getSymbol(this.id) as Function;

    return symbolFunction.type.enumType;
  }

  // get the value
  getValue(controller: Controller, ts: TableSymbol) {
    // verify if the the function exist in the table of symbols
    if (ts.exist(this.id)) {
      // create a new table of symbols
      let localST = new TableSymbol(ts);
      // get the symbol of the function / method
      let symbolFunction = ts.getSymbol(this.id) as Function;

      // verify if params are correct
      if (this.validateParams(this.params, symbolFunction.paramLit!, controller, ts, localST)) {
        let ret = symbolFunction.execute(controller, localST);

        if (ret != null) {
          return ret;
        }
      }
    } else {
      // error
      controller.append(`Error Semantico: La funcion ${this.id} no existe 1 en la linea ${this.line} y columna ${this.column}`);
    }
  }

  // string s = holamundo();
  // string holaMundo(){ return "hola mundo"; }
  execute(controller: Controller, ts: TableSymbol) {
    // verify if the the function exist in the table of symbols
    if (ts.exist(this.id)) {
      // create a new table of symbols
      let localST = new TableSymbol(ts);
      // get the symbol of the function / method
      let symbolFunction = ts.getSymbol(this.id) as Function;
      // verify if params are correct
      if (this.validateParams(this.params, symbolFunction.paramLit!, controller, ts, localST)) {
        let ret = symbolFunction.execute(controller, localST);

        if (ret != null) {
          return ret;
        }
      }
    } else {
      // error
      controller.append(`Error Semantico: La funcion ${this.id} no existe 2 en la linea ${this.line} y columna ${this.column}`);
    }
  }



  // method to validate the params
  validateParams(paramsCallback: Expression[], paramsFunction: Symbol[], controller: Controller, ts: TableSymbol, localST: TableSymbol) {
    // verify the amount of params
    if (paramsCallback.length == paramsFunction.length) {
      // -> params from function / method
      let aux: Symbol;    // param
      let auxId: string; // id param
      let auxType;       // type param

      // -> value from callback
      let aux_exp: Expression; // param to assing to the param
      let aux_exp_type;  // type of the expresssion
      let aux_exp_value; // value of the expression

      // Verify if each value to assing is the same type as the method params
      for (let i = 0; i < paramsCallback.length; i++) {
        // void suma(int n1, int n2){...}
        // suma(1,2);
        // int n1 = 3, n2 = 4;
        // -> save the info of the param in the function
        aux = paramsFunction[i] as Symbol;
        auxId = aux.id;
        auxType = aux.type.enumType; // INTEGER ...

        // -> save the info of the param in the callback
        aux_exp = paramsCallback[i] as Expression;
        aux_exp_type = aux_exp.getType(controller, ts);
        aux_exp_value = aux_exp.getValue(controller, ts);

        // validate if the value of the param of the callback is the same type as the param of the function
        if (auxType == aux_exp_type) {
          // if are the same save each value in the local table of symbols
          let newSymbol = new Symbol(aux.symbol, aux.type, aux.id, aux_exp_value, undefined, undefined, aux.line, aux.column);
          localST.add(auxId, newSymbol);
        }
        else {
          // if are not the same type return an error
          controller.append(`Error Semantico: El tipo de la variable ${auxId} no coincide con el valor asignado en la linea ${this.line} y columna ${this.column}`);
          return false;
        }
      }
      return true;
    } else {
      // if the amount of params are not the same return an error
      controller.append(`Error Semantico: La cantidad de parametros no coincide con la funcion ${this.id} en la linea ${this.line} y columna ${this.column}`);
      return false;
    }
  }

  // make the function
  goOver(): Node {
    let father = new Node("LLamada", "");
    father.addChild(new Node(this.id, ""));

    if (this.params.length > 0) {
      let params = new Node("Parametros", "");
      for (let i = 0; i < this.params.length; i++) {
        params.addChild(this.params[i].goOver());
      }
      father.addChild(params);
    }

    return father;

  }
}