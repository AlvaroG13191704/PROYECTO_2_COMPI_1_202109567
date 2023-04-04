import Editor from '@monaco-editor/react'


export const TextEditor = () => {
  return (
    <Editor
      theme='dark' 
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// type your code..."

    />
  )
}
