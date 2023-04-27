import Editor from "@monaco-editor/react"
import { analyzeStore } from "../store/resultStore"

const Console = () => {

  // get state
  const result = analyzeStore((state) => state.result)
  const error = analyzeStore((state) => state.error)


  return (
    // Console similar to the visual studio code console
    <div className="bg-gray-900 h-64  text-lg p-2">
      {/* Title of console  */}
      <div className="text-gray-200">Consola:</div>
      {/* Separator */}
      <div className="border-b-2 border-gray-700"></div>
      {/* Console output */}
      <Editor
        theme="vs-dark"
        options={{
          folding: true,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: true,
          minimap: {
            enabled: false
          }
        }}
        width="100%"
        height="90%"
        value={error ? error : result}
      />
    </div>
  )
}

export default Console