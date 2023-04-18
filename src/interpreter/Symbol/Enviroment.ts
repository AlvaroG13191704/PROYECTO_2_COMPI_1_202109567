import { Variable } from "./Variable";

export class Enviroment {

  previous: Enviroment | undefined;
  table_variables: Map<string, Variable>;
  // table_functions: Map<string, any>;

  constructor(previous: Enviroment | undefined) {
    this.previous = previous;
    this.table_variables = new Map<string, Variable>();
    // this.table_functions = new Map<string, any>();
  }

  // insert variable
  public insertVariable(id: string, variable: Variable){
    this.table_variables.set(id, variable);
  }

  // insert function
  // public insertFunction(id: string, function: any){
  //   this.table_functions.set(id, function);
  // }

  // get variable
  public getVariable(id: string): Variable | undefined{
    let e: Enviroment | undefined = this;
    while(e != null) {
      try {
        const variable = e.table_variables.get(id);
        if(variable != null) {
          return variable;
        }
      } catch (error) {
        console.log(error);
      }
      e = e.previous; // change enviroment if not found
    }
    return undefined;
  }

  // get function
  // public getFunction(id: string): any | undefined{
  //   let e: Enviroment = this;  
  //   while(e != null) {
  //     try {
  //       const function = e.table_functions.get(id);
  //       if(function != null) {
  //         return function;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     e = e.previous; // change enviroment if not found
  //   }
  //   return undefined;
  // }

  // verify if variable exists
  public existsVariable(id: string): boolean {
    return this.table_variables.get(id) != undefined;
  }
}