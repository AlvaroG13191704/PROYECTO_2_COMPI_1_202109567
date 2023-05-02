
// this enum type is used to define the type of the language

export enum type {
  INTEGER,
  DOUBLE,
  BOOLEAN,
  CHAR,
  STRING,
  ERROR,
  UNARY,
  VECTOR,
  LIST,
  VOID
}

// this class is used to have the control of the program types like INTEGER, DOUBLE, BOOLEAN, CHAR, STRING, ERROR, VOID

export class Type {
  public nameType: string;
  public enumType: type;

  constructor(nameType: string) {
    this.nameType = nameType;
    this.enumType = this.getType();
  }
  // return the num of the type, define in the enum
  public getType(): type {
    if(this.nameType === "INTEGER"){
      return type.INTEGER;
    }
    else if(this.nameType === "DOUBLE"){
      return type.DOUBLE;
    }
    else if(this.nameType === "BOOLEAN"){
      return type.BOOLEAN;
    }
    else if(this.nameType === "CHAR"){
      return type.CHAR;
    }
    else if(this.nameType === "STRING"){
      return type.STRING;
    }else if(this.nameType === "VECTOR"){
      return type.VECTOR;
    }
    else if(this.nameType === "VOID"){
      return type.VOID;
    }else {
      return type.ERROR;
    }
  }
  // get type to string
  public getTypeToString(): string {
    if(this.enumType === type.INTEGER){
      return "INTEGER";
    }
    else if(this.enumType === type.DOUBLE){
      return "DOUBLE";
    }
    else if(this.enumType === type.BOOLEAN){
      return "BOOLEAN";
    }
    else if(this.enumType === type.CHAR){
      return "CHAR";
    }
    else if(this.enumType === type.STRING){
      return "STRING";
    }
    else if(this.enumType === type.VOID){
      return "VOID";
    }else {
      return "ERROR";
    }
  }
}