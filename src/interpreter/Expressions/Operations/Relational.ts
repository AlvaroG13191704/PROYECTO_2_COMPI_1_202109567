import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Operation, Operator } from "./Operations";

export class Relational extends Operation implements Expression {
  // same class ass the Operation class
  constructor(exp1: Expression, exp2: Expression, expU: boolean, line: number, column: number, sign: string) {
    super(exp1, exp2, expU, line, column, sign)
  }

  getType(controller: Controller, ts: TableSymbol): type {
    let typeExp1: type;
    let typeExp2: type;

    // get the type
    typeExp1 = this.exp1.getType(controller, ts);
    typeExp2 = this.exp2.getType(controller, ts);

    if (typeExp1 === type.ERROR || typeExp2 === type.ERROR) {
      return type.ERROR;
    }

    /*
    INTEGER -> INTEGER - DOUBLE - CHAR
    DOUBLE  -> INTEGER - CHAR   
    CHAR    -> INTEGER - DOUBLE - CHAR
    BOOL    -> BOOL
    */

    if (typeExp1 === type.INTEGER) {
      if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE || typeExp2 === type.CHAR) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }
    }
    else if (typeExp1 === type.DOUBLE) {
      if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE || typeExp2 === type.CHAR) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }
    }
    else if (typeExp1 === type.CHAR) {
      if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE || typeExp2 === type.CHAR) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }
    }
    else if (typeExp1 === type.BOOLEAN) {
      if (typeExp2 === type.BOOLEAN) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }
    }
    else if (typeExp1 === type.STRING) {
      if (typeExp2 === type.STRING) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }
    }
    return type.ERROR;

  }

  // get value
  getValue(controller: Controller, ts: TableSymbol) {
    let valueExp1;
    let valueExp2;

    let typeExp1: type;
    let typeExp2: type;

    // get the value
    valueExp1 = this.exp1.getValue(controller, ts); // 8
    valueExp2 = this.exp2.getValue(controller, ts); // 2,5

    // get the type
    typeExp1 = this.exp1.getType(controller, ts); // INTEGER
    typeExp2 = this.exp2.getType(controller, ts); // DOUBLE


    switch (this.operator) {
      case Operator.LT:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) < parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) < valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional <. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) < parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) < valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional <. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) < parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) < valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional <. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 < val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional <. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 < valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional <. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      case Operator.GT:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) > parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) > valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional >. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) > parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) > valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional >. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) > parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) > valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional >. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 > val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional >. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 > valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional >. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      case Operator.LTE:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) <= parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) <= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional <=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) <= parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) <= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional <=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) <= parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) <= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional <=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 <= val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional <=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 <= valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional <=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      case Operator.GTE:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) >= parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) >= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional >=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) >= parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) >= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional >=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) >= parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) >= valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional >=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 >= val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional >=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 >= valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional >=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      case Operator.EQ:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) == parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) == valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional ==. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) == parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) == valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional ==. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) == parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) == valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional ==. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 == val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional ==. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 == valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional ==. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      case Operator.DIFF:
        if (typeExp1 === type.INTEGER) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseInt(valueExp1) != parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseInt(valueExp1) != valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de INTEGER, no se puede realizar la operacion relacional !=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.DOUBLE) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return parseFloat(valueExp1) != parseFloat(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return parseFloat(valueExp1) != valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de DOUBLE, no se puede realizar la operacion relacional !=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.CHAR) {
          if (typeExp2 === type.INTEGER || typeExp2 === type.DOUBLE) {
            return valueExp1.charCodeAt(0) != parseInt(valueExp2);
          }
          else if (typeExp2 === type.CHAR) {
            return valueExp1.charCodeAt(0) != valueExp2.charCodeAt(0);
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de CHAR, no se puede realizar la operacion relacional !=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            let val1 = valueExp1 ? 1 : 0;
            let val2 = valueExp2 ? 1 : 0;
            return val1 != val2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de BOOLEAN, no se puede realizar la operacion relacional !=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        else if (typeExp1 === type.STRING) {
          if (typeExp2 === type.STRING) {
            return valueExp1 != valueExp2;
          }
          else {
            // error
            controller.append(` *** ERROR: Semantico, Incompatibilidad de STRING, no se puede realizar la operacion relacional !=. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        }
        break;
      default:
        break;
    }
  }
  // create graphviz
  goOver(): Node {
    let father = new Node("Relacionales", "");

    father.addChild(this.exp1.goOver());
    father.addChild(new Node(this.sign, ""));
    father.addChild(this.exp2.goOver());

    return father;
  }

}