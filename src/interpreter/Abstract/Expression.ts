import { Node } from "../AST/Node";
import { Controller } from "../Controller";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { type } from "../TableSymbols/Type";


export interface Expression {

  // this method return the type of the value of the expression
  // controller -> control errors, prints of the interpreter
  // ts -> table of symbols
  getType(controller: Controller, ts: TableSymbol): type;

  // this method return the value of the expression
  // controller -> control errors, prints of the interpreter
  // ts -> table of symbols
  getValue(controller: Controller, ts: TableSymbol): any;

  // this methos go over the the sub tree of the expression
  goOver(): Node;
}