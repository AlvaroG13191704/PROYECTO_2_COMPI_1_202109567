import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  TableCellsIcon,
  ChartPieIcon,
  ChartBarIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { analyzeStore } from '../store/resultStore'
import Graphviz from 'graphviz-react'




const Navbar = () => {
  const reportsGraphs = analyzeStore((state) => state.reports);
  // open modal
  const [open, setOpen] = useState(false)
  const [report, setReport] = useState(0); // 1 = errores, 2 = ast, 3 = tabla de simbolos

  const handleModal = (value: number) => {
    setOpen(!open)
    if (value === 1) {
      setReport(1)
    }
    else if (value === 2) {
      setReport(2)
    }
    else if (value === 3) {
      setReport(3)
    }

    console.log(reportsGraphs)
  }
  const products = [
    { name: 'Reporte de Errores', description: 'Se monstrarán todos los errores encontrados al realizar el análisis léxico', function: () => handleModal(1), icon: ChartPieIcon },
    { name: 'Generar Árbol AST (Árbol de Análisis Sintáctico)', description: 'se debe generar una imagen del árbol de análisis sintáctico que se genera al realizar los análisis', function: () => handleModal(2), icon: ChartBarIcon },
    { name: 'Reporte de Tabla de Símbolos:', description: 'Se mostrarán todas las variables, métodos y funciones que han sido declarados dentro del flujo del programa', function: () => handleModal(3), icon: TableCellsIcon },
  ]
  return (
    <>
      <header className="bg-gray-900">
        <nav className="mx-auto flex max-w-7xl items-center justify-around p-6 lg:px-8" aria-label="Global">
          <button className="text-sm font-semibold leading-6 text-white hover:text-gray-400 ">
            Crear archivos
          </button>
          <button className="text-sm font-semibold leading-6 text-white hover:text-gray-400">
            Abrir archivos
          </button>
          <button className="text-sm font-semibold leading-6 text-white hover:text-gray-400">
            Guardar archivo
          </button>
          <button className="text-sm font-semibold leading-6 text-white hover:text-gray-400">
            Eliminar pestaña
          </button>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                Reportes
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-900 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700"
                      >
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-50">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          <button className="block font-semibold text-white" onClick={item.function}>
                            {item.name}
                            <span className="absolute inset-0" />
                          </button>
                          <p className="mt-1 text-gray-100">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </nav>
      </header>
      {/* Heaader */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 h-[700px]  w-[1300px] sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-2">
                      <Dialog.Title as="h2" className="text-base font-semibold leading-6 text-white">
                        {(report === 1) ? ("Reporte de Errores") : (report === 2) ? ("Reporte de Árbol AST") : ("Reporte de Tabla de Símbolos")}
                      </Dialog.Title>
                    </div>
                    <div>
                      {
                        ( reportsGraphs.ast_graph === "" || reportsGraphs.symbol_table === "") ?
                          ("No hay reporte disponible")
                          : ((report === 1) ?
                            (<Graphviz dot={reportsGraphs.table_errors} options={{ zoom: true, width: 1240, height: 500, }} />)
                            : (report === 2) ?
                              (<Graphviz dot={reportsGraphs.ast_graph} options={{ zoom: true, width: 1240, height: 500, }} />)
                              : (<Graphviz dot={reportsGraphs.symbol_table} options={{ zoom: true, width: 1240, height: 500, }} />))
                      }
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Navbar