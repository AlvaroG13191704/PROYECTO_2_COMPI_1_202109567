import Editor from '@monaco-editor/react';
import { analyzeStore } from '../store/resultStore';



export const TextEditor = () => {

  // state
  const { updateCurrentCode } = analyzeStore()

  // get the value of the editor
  const handleEditorDidMount = (getValue: any, monacoEditor: any) => {
    // change the value of the current grammar
    updateCurrentCode(getValue)
  };


  return (
    // Agregar un boton
    <Editor
      theme="vs-dark"
      options={{
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 15,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onChange={handleEditorDidMount}
      height="61%"
      defaultLanguage="java"
    />
  )
}
