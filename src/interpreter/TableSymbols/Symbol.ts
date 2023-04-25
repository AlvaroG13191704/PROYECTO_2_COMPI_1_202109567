import { Type } from "./Type";

// this class define the symbols of the language like variables, functions, methods...
export class Symbol {
  public symbol: number;
  // variables
  public type:Type;
  public id: string;
  public value: any;
  // functions / methods
  public paramLit : Symbol[] | undefined;
  public method: boolean | undefined;

  public line : number | undefined;
  public column : number | undefined;

  constructor(symbol: number, type: Type, id: string, value: any, paramLit?: Symbol[], method?: boolean, line?: number, column?: number) {
    this.symbol = symbol;
    this.type = type;
    this.id = id;
    this.value = value;
    this.paramLit = paramLit;
    this.method = method;
    this.line = line;
    this.column = column;
  }

  // set value
  setValue(value: any):void {
    this.value = value;
  }
  

}