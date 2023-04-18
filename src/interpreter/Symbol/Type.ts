import { TypePrimitive } from "./TypePrimitive";


export class Type {
  type: TypePrimitive;

  constructor(type: TypePrimitive) {
    this.type = type;
  }

  getType(): TypePrimitive {
    return this.type;
  }
}