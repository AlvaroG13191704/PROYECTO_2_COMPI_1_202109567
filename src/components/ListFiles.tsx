import { useState } from "react";
const ListFiles = () => {

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
  return (
    <div className="bg-gray-900 text-gray-400  flex flex-col">
      <div className="px-4 py-2 border-b border-gray-700">
        {files.map((file) => (
          <button
            key={file.id}
            className={`px-2 py-1 rounded ${
              file.active ? "bg-gray-700 text-gray-200" : ""
            }`}
            onClick={() => handleClick(file.id)}
          >
            {file.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListFiles