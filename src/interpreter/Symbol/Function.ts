import { Parameters } from "../Instructions/Parameters";

export class Function {
  name: string;
  params: Parameters[];
  sentences: Node[];

  constructor(name: string, params: Parameters[], sentences: Node[]) {
    this.name = name;
    this.params = params;
    this.sentences = sentences;
  }

  public getName() {
    return this.name;
  }

  public getParams() {
    return this.params;
  }
  
}