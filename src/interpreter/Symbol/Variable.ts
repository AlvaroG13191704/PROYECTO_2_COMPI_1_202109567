import { Type } from "./Type";

export class Variable {
  type: Type;
  id: string;
  value: any;

  constructor(type: Type, id: string, value: any) {
    this.type = type;
    this.id = id;
    this.value = value;
  }

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