import { Type } from "./Type";


// 
export class Symbol {
  public id: string;
  public value: any;
  public type: Type;

  constructor(id: string, value: any, type: Type) {
    this.id = id;        // "valueID"
    this.value = value;  // string 
    this.type = type;   // Type.STRING
  }
}