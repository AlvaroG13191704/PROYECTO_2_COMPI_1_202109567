const Console = () => {

  return (
    // Console similar to the visual studio code console
    <div className="bg-gray-900 h-64  text-lg p-2">
      {/* Title of console  */}
      <div className="text-gray-200">Consola:</div>
      {/* Separator */}
      <div className="border-b-2 border-gray-700"></div>
      {/* Console output */}
      <div className="text-white">
      </div>
    </div>
  )
}

export default Console