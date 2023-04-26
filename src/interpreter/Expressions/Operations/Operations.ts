import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { type } from "../../TableSymbols/Type";

export enum Operator {
  SUM,
  SUB,
  MUL,
  DIV,
  POW,
  MOD,
  UNARY,
  EQ, // equal
  DIFF, // differential
  LT, // less than
  GT, // greater than
  LTE, // less than or equal
  GTE, // greater than or equal
  OR, // logical or
  AND, // logical and
  NOT, // logical not
  NULL, // null
}

// this class is used to represent any operation
export class Operation implements Expression {

  public exp1: Expression; // left expresion
  public exp2: Expression; // right expresion
  public expU: boolean; // boolean to determinate if is unary
  public line: number; // line number
  public column: number; // column number
  public sign: string; // sign of the operation
  public operator: Operator; // type of operation

  constructor(
    exp1: Expression,
    exp2: Expression,
    expU: boolean,
    line: number,
    column: number,
    sign: string,
  ) {
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.expU = expU;
    this.line = line;
    this.column = column;
    this.sign = sign;
    this.operator = this.getOperator(sign);
  }

  // this method returns the type of operation
  getOperator(sign: string): Operator {
    switch (sign) {
      case "+":
        return Operator.SUM;
      case "-":
        return Operator.SUB;
      case "*":
        return Operator.MUL;
      case "/":
        return Operator.DIV;
      case "^":
        return Operator.POW;
      case "%":
        return Operator.MOD;
      case "==":
        return Operator.EQ;
      case "!=":
        return Operator.DIFF;
      case "<":
        return Operator.LT;
      case ">":
        return Operator.GT;
      case "<=":
        return Operator.LTE;
      case ">=":
        return Operator.GTE;
      case "||":
        return Operator.OR;
      case "&&":
        return Operator.AND;
      case "!":
        return Operator.NOT;
      case "UNARY":
        return Operator.UNARY;
      default:
        return Operator.NULL;
    }
  }

  // this are not used
  getType(controller: Controller, ts: TableSymbol): type {
    throw new Error("Not used");
  }
  getValue(controller: Controller, ts: TableSymbol) {
    throw new Error("Method not implemented.");
  }
  goOver(): Node {
    throw new Error("Method not implemented.");
  }
}