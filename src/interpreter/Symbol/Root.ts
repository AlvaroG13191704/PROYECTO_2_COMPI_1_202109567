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
      // this.executeFunctionsDeclarations(current_env, global_env, ast);

      for(let x = 0; x < this.sentences.length; x++){
        let sent = this.sentences[x];
        // extra code
      }
    } catch (error) {
      ast.writeConsole("Error -> " + error); // write error in console and test this
      console.log(error);
    }
  }

  // execute variables declarations
  private executeVariablesDeclarations(current_env: Enviroment, global_env: Enviroment, ast: AST){
    for(let x = 0; x < this.sentences.length; x++){
      let sent = this.sentences[x];
      // extra code
    }
  }

  // execute functions declarations
  // private executeFunctionsDeclarations(current_env: Enviroment, global_env: Enviroment, ast: AST){
  //   for(let x = 0; x < this.sentences.length; x++){
  //     let sent = this.sentences[x];
  //     // extra code
  //   }
  // }
  
}