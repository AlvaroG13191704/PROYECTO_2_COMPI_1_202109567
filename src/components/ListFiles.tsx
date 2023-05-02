import { useState } from "react";
import { analyzeStore } from "../store/resultStore";
import { AnalyzerParser } from "../interpreter/Analyzer/parser";
import { AST } from "../interpreter/AST/AST";
import { Node } from "../interpreter/AST/Node";
import { Controller } from "../interpreter/Controller";
import { TableSymbol } from "../interpreter/TableSymbols/TableSymbol";
const ListFiles = () => {

  // get the store 
  const grammar = analyzeStore((state) => state.grammar);
  const { updateResult } = analyzeStore();
  const { updateReport } = analyzeStore();

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
    // generate the graphviz
    let parser:any = new AnalyzerParser()
    let result: AST = parser.parse(grammar)
    let node_root: Node = result.goOver();
    let graph = node_root.graphTree();
    // get response
    let controller = new Controller();
    let ts_global = new TableSymbol(null);
    
    result.execute(controller, ts_global);
    console.log(controller.console);
    console.log(result)
    console.log(ts_global)
    // update the result
    if(controller.console.length > 0){
      updateResult(controller.console)
    }
    
    controller.getTableSymbol(controller, ts_global);
    // update the report
    updateReport({
      "table_errors":"",
      "ast_graph": graph,
      "symbol_table": ""
    })
    
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