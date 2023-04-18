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

  public getValue():any {
    return this.value;
  }

  public getType(): Type {
    return this.type;
  }

  public getId():string {
    return this.id;
  }
}