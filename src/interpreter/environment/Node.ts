export abstract class Node {
  public line: number;
  public column: number;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }
}