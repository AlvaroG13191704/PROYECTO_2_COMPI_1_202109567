import { Errors } from "../../AST/Errors";
import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Operation, Operator } from "./Operations";

export class Arithmetic extends Operation implements Expression {

  // same class ass the Operation class
  constructor(exp1: Expression, exp2: Expression, expU: boolean, line: number, column: number, sign: string) {
    super(exp1, exp2, expU, line, column, sign)
  }

  // return the type of the arithmetic operation
  getType(controller: Controller, ts: TableSymbol): type {
    let typeExp1: type; // example -> exp1.getType = INTEGER
    let typeExp2: type // example -> exp1.getType = DOUBLE

    if (!this.expU) {
      typeExp1 = this.exp1.getType(controller, ts);
      typeExp2 = this.exp2.getType(controller, ts);

      if (typeExp1 == type.ERROR || typeExp2 == type.ERROR) {
        return type.ERROR;
      }
    } else {
      // if is unary, the exp1 will get the negative value as -1 -> -exp1 -> exp1 = -1 exp1.getType = INTEGER
      typeExp1 = this.exp1.getType(controller, ts);

      if (typeExp1 == type.ERROR) {
        return type.ERROR;
      }

      typeExp2 = type.ERROR;
    }

    // validation base on the table 
    switch (this.operator) {
      // Sum
      case Operator.SUM:
        // first row 
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else if (typeExp2 == type.STRING) {

            return type.STRING;
          } else {
            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR) {

            return type.DOUBLE;
          }
          else if (typeExp2 == type.STRING) {

            return type.STRING;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.STRING) {

            return type.STRING;
          } else {
            return type.ERROR;
          }

        }
        // fourth row
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;

          }
          else if (typeExp2 == type.CHAR || typeExp2 == type.STRING) {

            return type.STRING;
          }
          else {

            return type.ERROR;
          }

        }
        // fifth row
        else if (typeExp1 == type.STRING) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR || typeExp2 == type.STRING) {

            return type.STRING;
          }
          else {

            return type.ERROR;
          }

        }
        break;

      case Operator.SUB:
        // first row
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {

          if (typeExp2 == type.INTEGER) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }

        }
        // fourth row
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }

        }
        // fifth row
        else if (typeExp1 == type.STRING) {
          return type.ERROR;
        }
        break;

      case Operator.MUL:
        // first row
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.CHAR) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.CHAR) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {
          return type.ERROR;
        }
        // fourth row
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // fifth row
        else if (typeExp1 == type.STRING) {
          return type.ERROR;
        }
        break;

      case Operator.DIV:
        // first row
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.CHAR) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.CHAR) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {
          return type.ERROR;
        }
        // fourth row
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // fifth row
        else if (typeExp1 == type.STRING) {
          return type.ERROR;
        }
        break;

      case Operator.POW:
        // first row
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {

            return type.INTEGER;
          }
          else if (typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {
          return type.ERROR;
        }
        // fourth row
        else if (typeExp1 == type.CHAR) {
          return type.ERROR;
        }
        // fifth row
        else if (typeExp1 == type.STRING) {
          return type.ERROR;
        }
        break;

      case Operator.MOD:
        // first row
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // second row
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE) {

            return type.DOUBLE;
          }
          else {

            return type.ERROR;
          }
        }
        // third row
        else if (typeExp1 == type.BOOLEAN) {
          return type.ERROR;
        }
        // fourth row
        else if (typeExp1 == type.CHAR) {
          return type.ERROR;
        }
        // fifth row
        else if (typeExp1 == type.STRING) {
          return type.ERROR;
        }
        break;

      case Operator.UNARY:
        if(typeExp1 == type.INTEGER){
          return type.INTEGER;
        }
        else if(typeExp1 == type.DOUBLE){
          return type.DOUBLE;
        }
        else {
          return type.ERROR;
        }
        break;
      default:
        break;
    }
    return type.ERROR;
  }

  // get value of the operation
  getValue(controller: Controller, ts: TableSymbol) {
    let valueExp1;
    let valueExp2;
    let valueUnaryEXP;

    let typeExp1: type;
    let typeExp2: type;
    let typeExpU: type;

    // if the expression is not unary
    if (this.expU == false) {
      // type
      typeExp1 = this.exp1.getType(controller, ts); // STRING
      typeExp2 = this.exp2.getType(controller, ts); // DOUBLE
      typeExpU = type.ERROR

      // valor
      valueExp1 = this.exp1.getValue(controller, ts); // "si"
      valueExp2 = this.exp2.getValue(controller, ts); // 2.4

    } else {
      // type
      typeExpU = this.exp1.getType(controller, ts); // 
      typeExp1 = type.ERROR;
      typeExp2 = type.ERROR;

      // valor
      valueUnaryEXP = this.exp1.getValue(controller, ts); // 2.4
    }

    // operations
    switch (this.operator) {
      case Operator.SUM:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return parseInt(valueExp1) + parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) + parseFloat(valueExp2);
          }
          else if (typeExp2 == type.BOOLEAN) {
            let bool_value = valueExp2 ? 1 : 0;
            return parseInt(valueExp1) + bool_value;
          }
          else if (typeExp2 == type.CHAR) {
            return parseInt(valueExp1) + valueExp2.charCodeAt(0);
          }
          else if (typeExp2 == type.STRING) {
            return valueExp1 + valueExp2;
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la suma INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) + parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) + parseFloat(valueExp2);
          }
          else if (typeExp2 == type.BOOLEAN) {
            let bool_value = valueExp2 ? 1 : 0;
            return parseFloat(valueExp1) + bool_value;
          }
          else if (typeExp2 == type.CHAR) {
            return parseFloat(valueExp1) + valueExp2.charCodeAt(0);
          }
          else if (typeExp2 == type.STRING) {
            return valueExp1 + valueExp2;
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la suma DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Boolean
        else if (typeExp1 == type.BOOLEAN) {
          let num_bool = valueExp1 ? 1 : 0;

          if (typeExp2 == type.INTEGER) {
            return num_bool + parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return num_bool + parseFloat(valueExp2);
          }
          else if (typeExp2 == type.STRING) {
            return num_bool.toString() + valueExp2;
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la suma BOOLEAN, en la linea ${this.line} y columna ${this.column}`);
          }

        }
        // Char
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {
            return valueExp1.charCodeAt(0) + parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return valueExp1.charCodeAt(0) + parseFloat(valueExp2);
          }
          else if (typeExp2 == type.CHAR) {
            return valueExp1 + valueExp2;
          }
          else if (typeExp2 == type.STRING) {
            return String(typeExp1) + valueExp2;
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la suma CHAR, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // String
        else if (typeExp1 == type.STRING) {

          if (typeExp2 == type.INTEGER || typeExp2 == type.DOUBLE || typeExp2 == type.BOOLEAN || typeExp2 == type.CHAR || typeExp2 == type.STRING) {
            return valueExp1 + valueExp2;
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la suma STRING, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        break;

      case Operator.SUB:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return parseInt(valueExp1) - parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) - parseFloat(valueExp2);
          }
          else if (typeExp2 == type.BOOLEAN) {
            let bool_value = valueExp2 ? 1 : 0;
            return parseInt(valueExp1) - bool_value;
          }
          else if (typeExp2 == type.CHAR) {
            return parseInt(valueExp1) - valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la resta INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) - parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) - parseFloat(valueExp2);
          }
          else if (typeExp2 == type.BOOLEAN) {
            let bool_value = valueExp2 ? 1 : 0;
            return parseFloat(valueExp1) - bool_value;
          }
          else if (typeExp2 == type.CHAR) {
            return parseFloat(valueExp1) - valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la resta DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Boolean
        else if (typeExp1 == type.BOOLEAN) {
          let num_bool = valueExp1 ? 1 : 0;

          if (typeExp2 == type.INTEGER) {
            return num_bool - parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return num_bool - parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la resta BOOLEAN, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Char
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {
            return valueExp1.charCodeAt(0) - parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return valueExp1.charCodeAt(0) - parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la resta CHAR, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // string
        else if (typeExp1 == type.STRING) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la resta STRING, en la linea ${this.line} y columna ${this.column}`);
        }
        break;

      case Operator.MUL:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return parseInt(valueExp1) * parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) * parseFloat(valueExp2);
          }
          else if (typeExp2 == type.CHAR) {
            return parseInt(valueExp1) * valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la multiplicación INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) * parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) * parseFloat(valueExp2);
          }
          else if (typeExp2 == type.CHAR) {
            return parseFloat(valueExp1) * valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la multiplicación DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // BOOLEAN
        else if (typeExp1 == type.BOOLEAN) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la multiplicación BOOL, en la linea ${this.line} y columna ${this.column}`);
        }
        // Char
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {
            return valueExp1.charCodeAt(0) * parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return valueExp1.charCodeAt(0) * parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la multiplicación CHAR, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // string
        else if (typeExp1 == type.STRING) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la multiplicación STRING, en la linea ${this.line} y columna ${this.column}`);
        }
        break;

      case Operator.DIV:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) / parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) / parseFloat(valueExp2);
          }
          else if (typeExp2 == type.CHAR) {
            return parseInt(valueExp1) / valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la división INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) / parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) / parseFloat(valueExp2);
          }
          else if (typeExp2 == type.CHAR) {
            return parseFloat(valueExp1) / valueExp2.charCodeAt(0);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la división DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // BOOLEAN
        else if (typeExp1 == type.BOOLEAN) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la división BOOL, en la linea ${this.line} y columna ${this.column}`);
        }
        // Char
        else if (typeExp1 == type.CHAR) {

          if (typeExp2 == type.INTEGER) {
            return valueExp1.charCodeAt(0) / parseInt(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return valueExp1.charCodeAt(0) / parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la división CHAR, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // string
        else if (typeExp1 == type.STRING) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la división STRING, en la linea ${this.line} y columna ${this.column}`);
        }
        break;

      case Operator.MOD:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) % parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) % parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para el modulo INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return parseFloat(valueExp1) % parseFloat(valueExp2);
          }
          else if (typeExp2 == type.DOUBLE) {
            return parseFloat(valueExp1) % parseFloat(valueExp2);
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para el modulo DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // BOOLEAN
        else if (typeExp1 == type.BOOLEAN) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para el modulo BOOL, en la linea ${this.line} y columna ${this.column}`);
        }
        // Char
        else if (typeExp1 == type.CHAR) {
          // error
          controller.append(`*** ERROR Semantico: Tipos no aceptados para el modulo CHAR, en la linea ${this.line} y columna ${this.column}`);
        }
        // string
        else if (typeExp1 == type.STRING) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para el modulo STRING, en la linea ${this.line} y columna ${this.column}`);
        }
        break;

      case Operator.POW:
        // Integer
        if (typeExp1 == type.INTEGER) {

          if (typeExp2 == type.INTEGER) {
            return Math.pow(parseInt(valueExp1), parseInt(valueExp2));
          }
          else if (typeExp2 == type.DOUBLE) {
            return Math.pow(parseFloat(valueExp1), parseFloat(valueExp2));
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la potencia INTEGER, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // Double
        else if (typeExp1 == type.DOUBLE) {

          if (typeExp2 == type.INTEGER) {
            return Math.pow(parseFloat(valueExp1), parseFloat(valueExp2));
          }
          else if (typeExp2 == type.DOUBLE) {
            return Math.pow(parseFloat(valueExp1), parseFloat(valueExp2));
          }
          else {
            // ERROR
            controller.append(`*** ERROR Semantico: Tipos no aceptados para la potencia DOUBLE, en la linea ${this.line} y columna ${this.column}`);
          }
        }
        // BOOLEAN
        else if (typeExp1 == type.BOOLEAN) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la potencia BOOL, en la linea ${this.line} y columna ${this.column}`);
        }
        // Char
        else if (typeExp1 == type.CHAR) {
          // error
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la potencia CHAR, en la linea ${this.line} y columna ${this.column}`);
        }
        // string
        else if (typeExp1 == type.STRING) {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para la potencia STRING, en la linea ${this.line} y columna ${this.column}`);
        }
        break;

      case Operator.UNARY:
        if(typeExpU == type.INTEGER || typeExpU == type.DOUBLE){
          return -valueUnaryEXP;
        }else {
          controller.append(`*** ERROR Semantico: Tipos no aceptados para el menos unario, en la linea ${this.line} y columna ${this.column}`);
        }
      default:
        break;
    }
    return null;
  }

  goOver(): Node {
    let father = new Node("OPERACIÓN ARITMETICA", "");

    if (this.expU) {
      father.addChild(new Node(this.sign, ""));
      father.addChild(this.exp1.goOver());
    } else {
      father.addChild(this.exp1.goOver());
      father.addChild(new Node(this.sign, ""));
      father.addChild(this.exp2.goOver());
    }

    return father;
  }
}