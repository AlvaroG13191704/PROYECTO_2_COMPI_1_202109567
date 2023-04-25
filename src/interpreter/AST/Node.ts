export class Node {
  public token: string;
  public lexeme: string;
  public children: Node[];

  constructor(token: string, lexeme: string) {
    this.token = token;
    this.lexeme = lexeme;
    this.children = [];
  }

  // method to add a child to the list 
  public addChild(child: Node): void {
    this.children.push(child);
  }

  // method to get the token 
  public getToken(): string {
    return this.token;
  }

  // method to graph the tree
  public graphTree(): string {
    let graph: string = `digraph {\n\n${this.graphNodes(this, "0")} \n\n}`;
    return graph;
  }

  // method to graph the nodes
  public graphNodes(node: Node, i: string): string {
    let k = 0;
    let r = "";
    let nodeTerm: string = node.token;
    nodeTerm = nodeTerm.replace("\"", "");

    r = `node${i}[label = \"${nodeTerm}\"];\n`;

    for (let j = 0; j <= node.children.length - 1; j++) {
      r = `${r}node${i} -> node${i}${k}\n`;
      r = r + this.graphNodes(node.children[j], "" + i + k);
      k = k + 1;
    }

    if (!(node.lexeme.match('')) || !(node.lexeme.match(""))) {
      let nodeToken = node.lexeme;
      nodeToken = nodeToken.replace("\"", "");
      r = r + `node${i}c[label = \"${nodeToken}\"];\n`;
      r = r + `node${i} -> node${i}c\n`;
    }
    return r;
  }
}