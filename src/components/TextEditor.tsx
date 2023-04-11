import Editor from '@monaco-editor/react'


export const TextEditor = () => {

  return (
    <Editor
      theme="vs-dark"
      keepCurrentModel={true}
      options={{
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 15,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      height="61%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  )
}
