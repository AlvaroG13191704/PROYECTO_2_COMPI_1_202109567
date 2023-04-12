import { Type } from "./Type";

export class Variable {
  type : Type;
  id: string;
  value: any; // can be any type, change then to function || object || array || string || number || boolean

  constructor(type: Type, id: string, value: any) {
    this.type = type;
    this.id = id;
    this.value = value;
  }


  // Getters and Setters
  public setValue(value: any) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public getType() {
    return this.type;
  }

  public getId() {
    return this.id;
  }

}