import { Node } from "../AST/Node";
import { Instruction } from "../Abstract/Instruction";
import { Controller } from "../Controller";
import { Symbol } from "../TableSymbols/Symbol";
import { TableSymbol } from "../TableSymbols/TableSymbol";
import { Type } from "../TableSymbols/Type";

export class Function extends Symbol implements Instruction {
  public listInstructions: Instruction[];
  public line: number;
  public column: number;

  constructor(symbol: number, type: Type, id: string, paramLit: Symbol[], method: boolean,listInstructions: Instruction[], line: number, column: number) {
    super(symbol, type, id, null, paramLit, method);
    this.listInstructions = listInstructions;
    this.line = line;
    this.column = column;
  }

  // method to add the symbol to the table of symbols
  appendFunctionST(ts: TableSymbol){
    if(!(ts.exist(this.id))){
      ts.add(this.id, this);
    }else {
      // error
      console.log("Error Semantico: La funcion " + this.id + " ya existe en la linea " + this.line + " y columna " + this.column);  
    }
  }

  // method to execute the instructions
  execute(controller: Controller, ts: TableSymbol) {
    // create a new table of symbols
    let localST = new TableSymbol(ts);
    // here we execute the instructions withouth any validation because in the callback class we already validate the function
    for(let inst of this.listInstructions){
      let ret = inst.execute(controller, localST);

      if( ret != null){
        return ret;
      }
    }
    return null;
  }

  // create the graph of the function
  goOver(): Node {
    let father = new Node("Function","");
    // father.addChild( new Node(this.type.nameType,"") );
    father.addChild( new Node(this.id,"") );

    father.addChild(new Node("(",""));

    // TODO:add the parameters if the function has
    // if(this.paramLit.length > 0){
    //   for(let param of this.paramLit){
    //     father.addChild(param.goOver());
    //   }
    // }

    father.addChild(new Node(")",""));
    father.addChild(new Node("{",""));

    // add the instructions if the function has
    let instructions = new Node("Instructions","");
    for(let inst of this.listInstructions){
      instructions.addChild(inst.goOver());
    }
    father.addChild(instructions);

    father.addChild(new Node("}",""));

    return father;
  }
}