import { useState } from "react";
import { analyzeStore } from "../store/resultStore";
import { ParserParser } from "../interpreter/analyzer/parser";
import { Analyzer } from "../interpreter/analyzer/Analyzer";
import { AST } from "../interpreter/Symbol/AST";
const ListFiles = () => {

  // get the store 
  const grammar = analyzeStore((state) => state.grammar);
  const { updateResult } = analyzeStore();

  const [files, setFiles] = useState([
    { id: 1, name: "archivoPrueba.tw", active: true },
    { id: 2, name: "main.tw", active: false },
    { id: 3, name: "app.tw", active: false },
  ]);

  const handleClick = (id: number) => {
    const updatedFiles = files.map((file) =>
      file.id === id ? { ...file, active: true } : { ...file, active: false }
    );
    setFiles(updatedFiles);
  };

  // handle execute button
  const handleExecute = () => {
    // let parser:any = new ParserParser()
    // console.log(result)
    // parser.parse(result)

    let analyzer = new Analyzer(grammar,"editor");
    let ast: AST = analyzer.Analyze();

    if(ast != undefined){
      const re = ast.getOutput()
      updateResult(re)
      
    }
  }
  return (
    <div className="bg-gray-900 text-gray-400  flex flex-col">
      <div className="px-4 py-2 border-b border-gray-700">
        {files.map((file) => (
          <button
            key={file.id}
            className={`px-2 py-1 rounded ${file.active ? "bg-gray-700 text-gray-200" : ""
              }`}
            onClick={() => handleClick(file.id)}
          >
            {file.name}
          </button>
        ))}
        {/* Execute buttom */}
        <div className="flex flex-row justify-end">
          <button 
            onClick={handleExecute}
            className="bg-green-600 text-gray-200 px-10 py-1 rounded hover:bg-green-700"
            >
            Ejecutar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListFiles