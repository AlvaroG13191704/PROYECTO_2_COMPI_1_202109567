import Editor from '@monaco-editor/react';
import { analyzeStore } from '../store/resultStore';



export const TextEditor = () => {

  // state
  const { updateCurrentCode } = analyzeStore();

  const grammar = analyzeStore((state) => state.grammar);

  // get the value of the editor
  const handleEditorDidMount = (getValue: any, monacoEditor: any) => {
    // change the value of the current grammar
    updateCurrentCode(getValue)
  };

  // console.log(grammar)

  return (
    // Agregar un boton
    <Editor
      theme="vs-dark"
      options={{
        folding: true,
        lineNumbersMinChars: 3,
        fontSize: 15,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onChange={handleEditorDidMount}
      height="55%"
      defaultLanguage="java"
      // set the grammar with the true open window
      value={ grammar }
    />
  )
}
