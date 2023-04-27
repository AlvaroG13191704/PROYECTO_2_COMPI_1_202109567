import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";
import { Operation, Operator } from "./Operations";

export class Logic extends Operation implements Expression {
  // same class ass the Operation class
  constructor(exp1: Expression, exp2: Expression, expU: boolean, line: number, column: number, sign: string) {
    super(exp1, exp2, expU, line, column, sign)
  }

  // get the type
  getType(controller: Controller, ts: TableSymbol): type {
    let typeExp1: type;
    let typeExp2: type;
    let typeExpU: type;

    if (!this.expU) {
      typeExp1 = this.exp1.getType(controller, ts); // boolean
      typeExp2 = this.exp2.getType(controller, ts); // boolean

      typeExpU = type.ERROR;
    } else {
      typeExpU = this.exp1.getType(controller, ts); // boolean

      typeExp1 = type.ERROR;
      typeExp2 = type.ERROR;

    }
    // compare the sing 
    if (!this.expU) {
      if (typeExp1 === type.BOOLEAN) {
        if (typeExp2 === type.BOOLEAN) {
          return type.BOOLEAN;
        } else {
          return type.ERROR;
        }
      } else {
        return type.ERROR;
      }
    } else { // !true
      if (typeExpU === type.BOOLEAN) {
        return type.BOOLEAN;
      } else {
        return type.ERROR;
      }

    }
  }

  // get the value
  getValue(controller: Controller, ts: TableSymbol) {
    let valueExp1;
    let valueExp2;
    let valueUnaryEXP;

    let typeExp1: type;
    let typeExp2: type;
    let typeExpU: type;

    // if the expression is not unary
    if (this.expU === false) {
      // type
      typeExp1 = this.exp1.getType(controller, ts); // BOOLEAN
      typeExp2 = this.exp2.getType(controller, ts); // BOOLEAN
      typeExpU = type.ERROR

      // valor
      valueExp1 = this.exp1.getValue(controller, ts); // true
      valueExp2 = this.exp2.getValue(controller, ts); // false

    } else {
      // type
      typeExpU = this.exp1.getType(controller, ts); // BOOLEAN
      typeExp1 = type.ERROR;
      typeExp2 = type.ERROR;

      // valor
      valueUnaryEXP = this.exp1.getValue(controller, ts); // 2.4
    }

    switch (this.operator) {
      case Operator.AND:
        if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            return valueExp1 && valueExp2;
          } else {
            controller.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        } else {
          controller.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND. En la linea ${this.line} y columna ${this.column}`)
          return null;
        }
        break;
      case Operator.OR:
        if (typeExp1 === type.BOOLEAN) {
          if (typeExp2 === type.BOOLEAN) {
            return valueExp1 || valueExp2;
          } else {
            controller.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR. En la linea ${this.line} y columna ${this.column}`)
            return null;
          }
        } else {
          controller.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR. En la linea ${this.line} y columna ${this.column}`)
          return null;
        }
        break;
      case Operator.NOT:
        if (typeExpU === type.BOOLEAN) {
          return !valueUnaryEXP;
        } else {
          controller.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica NOT. En la linea ${this.line} y columna ${this.column}`)
          return null;
        }
        break;
      default:
        break;
    }
  }

  // create graphviz
  goOver(): Node {
    let father = new Node("Logica","");

    if (this.expU){
      father.addChild( new Node(this.sign,""));
      father.addChild(this.exp1.goOver());
    }else {
      father.addChild(this.exp1.goOver());
      father.addChild( new Node(this.sign,""));
      father.addChild(this.exp2.goOver());
    }
    return father;
  }
}