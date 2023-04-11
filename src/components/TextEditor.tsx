import Editor from '@monaco-editor/react';

export const TextEditor = () => {

  // get the value of the editor
  const handleEditorDidMount = (getValue: any, monacoEditor: any) => {
    // console.log(getValue);
  };

  return (
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
      defaultLanguage="javascript"
    />
  )
}
