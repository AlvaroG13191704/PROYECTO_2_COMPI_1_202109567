import { Type } from "./Type";


// 
export class Symbol {
  public id: string;
  public value: any;
  public type: Type;

  constructor(id: string, value: any, type: Type) {
    this.id = id;
    this.value = value;
    this.type = type;
  }
}