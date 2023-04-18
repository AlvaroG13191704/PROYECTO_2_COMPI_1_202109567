import { AST } from "../Symbol/AST";
import { Root } from "../Symbol/Root";
import { ParserParser } from "./parser";


interface Error {
  message: string;
  type: string;
  line: number;
  column: number;
}

export class Analyzer {

  entry: string;
  file: string;
  errors: Error[]

  constructor(entry: string, file: string) {
    this.entry = entry;
    this.file = file;
    this.errors = [];
  }

  public Analyze():any {
    let parser:any = new ParserParser();

    parser.parseErro = function (err:any, hash:any) {
      this.errors.push({
        message: `Se esperaba ${hash.expected.join(", ")} pero se encontró ${hash.token}`,
        type: "Syntax",
        line: hash.loc.first_line,
        column: hash.loc.last_column,
      });
    }

    let tree: AST;
    try {
      let root: Root = parser.parse(this.entry);
      tree = new AST(root);
      // execute the tree
      console.log(tree);
      tree.execute();

      return tree;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}