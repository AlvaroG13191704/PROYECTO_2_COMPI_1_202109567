import { analyzeStore } from "../store/resultStore";
import { AnalyzerParser } from "../interpreter/Analyzer/parser";
import { AST } from "../interpreter/AST/AST";
import { Node } from "../interpreter/AST/Node";
import { Controller } from "../interpreter/Controller";
import { TableSymbol } from "../interpreter/TableSymbols/TableSymbol";
import { errorList } from "../interpreter/AST/Errors";

const ListFiles = () => {

  // get the store 
  const grammar = analyzeStore((state) => state.grammar);
  const windows = analyzeStore((state) => state.windows);

  const { updateResult, updateWindows, updateReport, updateCurrentCode, deleteWindows } = analyzeStore();
  // use state 

  const handleClick = (id: number) => {
    // update the current code
    const windowGramar = windows.find((window) => window.id === id)!;
    updateCurrentCode(windowGramar.grammar);
    // update windows
    const updatedWindows = windows.map((window) =>
      window.id === id ? { ...window, open: true, grammar: grammar } : { ...window, open: false }
    );
    // update the state
    updateWindows(updatedWindows);

    console.log(windows)
  };

  // handle execute button
  const handleExecute = () => {
    // generate the graphviz
    let parser: any = new AnalyzerParser()
    let result: AST = parser.parse(grammar)
    let node_root: Node = result.goOver();
    let graph = node_root.graphTree();
    // get response
    let controller = new Controller();
    let ts_global = new TableSymbol(null);

    result.execute(controller, ts_global);
    console.log(controller.console);

    // update the result
    if (controller.console.length > 0) {
      updateResult(controller.console)
    }

    let ts_graph = controller.getTableSymbol(controller, ts_global);
    let t_errors = controller.getErrors();
    //clean the symbol table
    TableSymbol.cleanTable();
    // clean errors
    // errorList.Errors = [];
    // update the report
    updateReport({
      "table_errors": t_errors,
      "ast_graph": graph,
      "symbol_table": ts_graph
    })

  }

  // delete window
  const handleDeleteWindow = (id: number, event:any) => {
    event.stopPropagation();
    // delete the window
    const updatedWindows = windows.filter((window) => window.id !== id);
    // update the state
    deleteWindows(updatedWindows);

    console.log(updatedWindows)
  }

  return (
    <div className="bg-gray-900 text-gray-400  flex flex-col">
      <div className="px-4 py-2 border-b border-gray-700">
        {windows.map((file) => (
          <button
            key={file.id}
            className={`px-2 py-1 rounded ${file.open ? "bg-gray-700 text-gray-200" : ""
              }`}
            onClick={() => handleClick(file.id)}
          >
            <div className="flex flex-row">
              {file.nameFile}
              {/* Add a X to delete */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => handleDeleteWindow(file.id, event)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
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