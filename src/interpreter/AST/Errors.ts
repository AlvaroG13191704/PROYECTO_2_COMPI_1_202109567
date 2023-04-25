

export let errorList = {
  Errors: new Array<Errors>(),
}


export class Errors {
  public type: string;
  public description: string;
  public line: number;
  public column: number;

  constructor(type: string, description: string, line: number, column: number) {
    this.type = type;
    this.description = description;
    this.line = line;
    this.column = column;

    if(type === "Sintactico" || type === "Lexico") {
      errorList.Errors.push(this);
    }
  }
}