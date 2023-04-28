import { Node } from "../../AST/Node";
import { Expression } from "../../Abstract/Expression";
import { Instruction } from "../../Abstract/Instruction";
import { Controller } from "../../Controller";
import { TableSymbol } from "../../TableSymbols/TableSymbol";
import { Break } from "../TransferSentences/Break";
import { Case } from "./Case";

export class Switch implements Instruction {
  public condition: Expression;
  public cases: Case[];
  public listDefault: Instruction;
  public line: number;
  public column: number;

  constructor(condition: Expression, cases: Case[], listDefault: Instruction, line: number, column: number) {
    this.condition = condition;
    this.cases = cases;
    this.listDefault = listDefault;
    this.line = line;
    this.column = column;
  }

  // execute the switch
  execute(controller: Controller, ts: TableSymbol) {
    // create new symbol table
    let localST = new TableSymbol(ts);
    // manage to flags
    let breakFlag = false; // indicates when the break is in the case
    let insideCaseFlag = false; // indicates when is inside a case to execute the instructions
    for(const c of this.cases){
      // evaluate if the case condition is true
      if( this.condition.getType(controller, ts) == c.value.getType(controller, ts)){
        // if the condition is true, execute the instructions
        if( this.condition.getValue(controller, ts) == c.value.getValue(controller, ts) || insideCaseFlag){
          // set the flag to true
          insideCaseFlag = true; // inside the case
          let res: any = c.execute(controller, localST);
          // if the result is a break, set the flag to false
          if(res instanceof Break){
            breakFlag = true;
            return res;
          }
        }
      }else {
        // error, the condition is not the same type
        controller.append(`Error Semantico: No se puede evaluar la condicion del case en la linea ${this.line} y columna ${this.column}`);
      }
    }
    if(!breakFlag && this.listDefault != null) {
      let res: any = this.listDefault.execute(controller, localST);
      if(res instanceof Break){
        breakFlag = true;
        return res;
      }
    }
  }

  // create node
  goOver(): Node {
    let root = new Node("Switch", "");
    let condition = new Node("Condition", "");
    condition.addChild(this.condition.goOver());
    root.addChild(condition);
    let cases = new Node("Cases", "");
    for(const c of this.cases){
      cases.addChild(c.goOver());
    }
    root.addChild(cases);
    if(this.listDefault != null){
      let defaultNode = new Node("Default", "");
      defaultNode.addChild(this.listDefault.goOver());
      root.addChild(defaultNode);
    }
    return root;
  }

}