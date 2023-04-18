import { Root } from "./Root";

export class AST {

  // root of execution tree
  private root: Root;

  private output: string;

  constructor(root: Root) {
    this.root = root;
    this.output = "";
  }

  public execute() {
    this.root.execute(this);
  }

  public writeConsole(value: string) {
    this.output += value + "\n";
  }

  public getOutput() {
    return this.output;
  }
}