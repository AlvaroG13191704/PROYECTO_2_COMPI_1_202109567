import { Function } from "./Function";
import { Variable } from "./Variable";

export class Enviroment {

  previous: Enviroment | undefined;
  table_variables: Map<string, Variable>;
  table_functions: Map<string, Function>;

  constructor(previous: Enviroment | undefined) {
    this.previous = previous;
    this.table_variables = new Map<string, Variable>();
    this.table_functions = new Map<string, Function>();
  }

  // insert variable
  public insertVariable(id: string, variable: Variable) {
    this.table_variables.set(id, variable);
  }

  // insert function
  public insertFunction(id: string, func: Function) {
    this.table_functions.set(id, func);
  }

  // get variable
  public getVariable(id: string): Variable | undefined {
    let e: Enviroment | undefined = this;
    while (e != undefined) {
      try {
        const variable = e.table_variables.get(id);
        if (variable != null) {
          return variable as Variable;
        }
      } catch (error) {
        console.log(error);
      }
      e = e.previous;
    }
    return undefined;
  }

  // get function
  public getFunction(id: string): any | undefined {
    return this.table_functions.get(id);
  }

  // verify if variable exists
  public existsVariable(id: string): boolean {
    return this.table_variables.get(id) != undefined;
  }
}