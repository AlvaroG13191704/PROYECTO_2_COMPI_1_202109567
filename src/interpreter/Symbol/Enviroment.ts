import { Symbol } from "./Symbol";
import { Type } from "./Type";

export class Enviroment {

  // add to manage the enviroment


  /*
     Example:
     int num = 5;
     < num, Symbol(5, num, number) >
     ...
  */
  private variables: Map<string, Symbol>; // symbol class has a type and a value and id
   // add functions table
   
  // refers to the previous enviroment
  constructor(public previous: Enviroment | null) {
    this.variables = new Map();
  }

  
  public saveVariable(name: string, value: any, type: Type){
    if(this.searchVariable(name)){
      this.variables.set(name, new Symbol(name, value, type));
      return;
    }
    return false;
  }

  public searchVariable(name: string): boolean{
    for( const entry of Array.from(this.variables.entries())){
      if(entry[0] === name){
        return true;
      }
    }
    return false;
  }

  public getVariable(id: string): Symbol | undefined | null {
    let env: Enviroment | null = this;
    while(env != null){
      if(env.variables.has(id)){
        return env.variables.get(id);
      }
      env = env.previous;
    }
    return null;
  }
}