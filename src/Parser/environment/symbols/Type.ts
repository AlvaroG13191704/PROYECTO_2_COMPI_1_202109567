import { PrimitiveType } from "./PrimitiveType";  

export class Type {
  
  type: PrimitiveType;
  
  constructor(type: PrimitiveType) {
    this.type = type;
  }

  getPrimiviteType(): PrimitiveType{
    return this.type;
  }
}