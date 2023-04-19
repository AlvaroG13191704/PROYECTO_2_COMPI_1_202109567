import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { FunctionDeclaration } from "../Instructions/FunctionDeclaration";
import { Print } from "../Instructions/Print";
import { VariableDeclaration } from "../Instructions/VariableDeclaration";
import { AST } from "./AST";
import { Enviroment } from "./Enviroment";
import { Node } from "./Node";

export class Root {
  private sentences: Node[];

  constructor(sentences: Node[]) {
    this.sentences = sentences;
  }

  // exceute root
  public execute(ast: AST){
    try {
      let global_env: Enviroment = new Enviroment(undefined);
      let current_env: Enviroment = global_env;

      this.executeVariablesDeclarations(current_env, global_env, ast);
      this.executeFunctionsDeclarations(current_env, global_env, ast);
      
      // console.log("global_env", global_env);
      // console.log("current_env", current_env);

      for(let x = 0; x < this.sentences.length; x++){
        let sent = this.sentences[x];
        // extra code to execute the sentences that we want
        if(!(sent instanceof VariableDeclaration) && !(sent instanceof FunctionDeclaration)){
          if(sent instanceof Instruction ) {
            sent.execute(current_env, global_env, ast)
          }else if(sent instanceof Expression){
            sent.getValue(current_env, global_env, ast);
          } 
        }
      }
    } catch (ex) {
      ast.writeConsole("Error -> " + ex); // write error in console and test this
      console.error(ex);
    }
  }

  // execute variables declarations
  private executeVariablesDeclarations(current_env: Enviroment, global_env: Enviroment, ast: AST){
    for(let x = 0; x < this.sentences.length; x++){
      let sent = this.sentences[x];
      if(sent instanceof VariableDeclaration){
        sent.execute(current_env, global_env, ast);
      }
    }
  }

  // execute functions declarations
  private executeFunctionsDeclarations(current_env: Enviroment, global_env: Enviroment, ast: AST){
    for(let x = 0; x < this.sentences.length; x++){
      let sent = this.sentences[x];
      if(sent instanceof FunctionDeclaration){
        sent.execute(current_env, global_env, ast);
      }
    }
  }
  
}