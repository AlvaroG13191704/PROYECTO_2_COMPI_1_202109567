import Console from './components/Console'
import FilesBar from './components/FilesBar'
import ListFiles from './components/ListFiles'
import Navbar from './components/Navbar'
import { TextEditor } from './components/TextEditor'

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-1/6 border-r">
          <FilesBar />
        </div>
        <div className="flex flex-col w-5/6">
          <ListFiles />
          <TextEditor />
          <Console />
        </div>
      </div>
    </div>
  )
}

export default App
