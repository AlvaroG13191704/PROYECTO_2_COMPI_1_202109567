import { analyzeStore } from '../store/resultStore';

const FilesBar = () => {

  const windows = analyzeStore((state) => state.windows);

  // use effect to update the files


  return (
    <div className="bg-gray-900 w-full min-h-full py-4">
      <div className="text-white text-lg uppercase font-bold px-4 pb-2">Directorio:</div>
      {/* Separator */}
      <div className="border-b-2 border-gray-700"></div>
      
      <div className="overflow-y-auto">
        {windows.map((file, index) => (
          <div key={index} className="flex items-center py-3 px-4 border-b border-spacing-x-4">
            <div className="w-4 h-4 mr-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ">
                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </div>
            <div className="truncate text-white mt-2 hover:text-gray">{file.nameFile}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilesBar